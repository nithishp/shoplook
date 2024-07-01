import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    Platform: 'com.nithish.shoplook',
    projectId: '668210cb002213c898a5',
    databasseId: '668212370003362b076a',
    userCollectionId: '668212710004657fe209',
    videoCollectionId: '66821291002a41d8d47c',
    storageId: '66821b3d00150b136df7'
};

const client = new Client();
client  
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.Platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);
        if (!newAccount) throw new Error('Account creation failed');

        const avatarUrl = avatars.getInitials(username);
        await signIn(email, password);

        const newUser = await databases.createDocument(
            appwriteConfig.databasseId,
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
        console.log(error);
        throw new Error(error.message || 'An error occurred during user creation');
    }
};

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        throw new Error(error.message || 'An error occurred during sign in');
    }
};
