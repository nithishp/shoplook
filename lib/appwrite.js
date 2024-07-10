import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    Platform: 'com.nithish.shoplook',
    projectId: '668210cb002213c898a5',
    databaseId: '668212370003362b076a',  // Corrected typo
    userCollectionId: '668212710004657fe209',
    videoCollectionId: '66821291002a41d8d47c',
    storageId: '66821b3d00150b136df7',
    shopCollectionId:'66893dcd0026c0e6e182'
};

const client = new Client();
client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.Platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client)

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);
        if (!newAccount) throw new Error('Account creation failed');

        const avatarUrl = avatars.getInitials(username);
        await signIn(email, password);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,  // Corrected typo
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        );
        return newUser;
    } catch (error) {
        console.error('Error during user creation:', error);
        throw new Error(error.message || 'An error occurred during user creation');
    }
};

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.error('Error during sign in:', error);
        throw new Error(error.message || 'An error occurred during sign in');
    }
};

export async function getAccount() {
    try {
        const currentAccount = await account.get();
        return currentAccount;
    } catch (error) {
        console.error('Error getting account:', error);
        throw new Error(error.message || 'An error occurred while getting the account');
    }
}

// Get Current User
export async function getCurrentUser() {
    try {
        const currentAccount = await getAccount();
        if (!currentAccount) throw new Error('No current account found');

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,  // Corrected typo
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        if (!currentUser || currentUser.total === 0) throw new Error('No current user found');
        return currentUser.documents[0];
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
}

export async function signOut() {
    try {
        const session = await account.deleteSession('current');
        return session;
    } catch (error) {
        console.error('Error during sign out:', error);
        throw new Error(error.message || 'An error occurred during sign out');
    }
}

export const getAllStores = async()=>{
  try {
    const shops = await databases.listDocuments(appwriteConfig.databaseId,appwriteConfig.shopCollectionId,[Query.orderDesc('$createdAt')])
    return shops.documents
    
  } catch (error) {
    throw new Error(error)
    
  }
}

export const getLatestShops = async()=>{
    try {
      const shops = await databases.listDocuments(appwriteConfig.databaseId,appwriteConfig.shopCollectionId,[Query.orderDesc('$createdAt',Query.limit(7))])
      return shops.documents
      
    } catch (error) {
      throw new Error(error)
      
    }
  }

  export const searchShops = async(query)=>{
    try {
      const shops = await databases.listDocuments(appwriteConfig.databaseId,appwriteConfig.shopCollectionId,[Query.search('name',query)])
      return shops.documents
      
    } catch (error) {
      throw new Error(error)
      
    }
  }

  export const getUserShops = async(userId)=>{
    try {
      const shops = await databases.listDocuments(appwriteConfig.databaseId,appwriteConfig.shopCollectionId,[Query.equal('creator',userId),Query.orderDesc('$createdAt')])
      return shops.documents
      
    } catch (error) {
      throw new Error(error)
      
    }
  }

export const getFilePreview = async (fileId, type) => {
  let fileUrl;
  try {
    if (type === 'image') {
      fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000, 2000, 'top', 100);
    } else {
      throw new Error('Invalid File');
    }

    if (!fileUrl) throw new Error('File URL not generated');
    return fileUrl;
  } catch (error) {
    throw error;
  }
};

export const uploadFile = async (file, type) => {
  if (!file) return;
  const { mimeType, ...rest } = file;
  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId, ID.unique(), asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw error;
  }
};

export const createShops = async (form) => {
  try {
    const imageUrl = await uploadFile(form.image, 'image');

    const newShop = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.shopCollectionId, ID.unique(), {
      name: form.name,
      image: imageUrl,
      // image:form.image,
      location: form.location,
      creator: form.userId,
    });
    return newShop
  } catch (error) {
    throw error;
  }
};
