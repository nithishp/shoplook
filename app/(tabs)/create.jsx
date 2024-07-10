import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import FormField from "../../components/FormField";
import { icons } from "../../constants";
import CustomButton from '../../components/CustomButton';
import { router } from "expo-router";
import { createShops } from "../../lib/appwrite";
import {useGlobalContext} from '../../context/GlobalProvider'

const Create = () => {
  const {user} = useGlobalContext()
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    location: "",
    image: "",
  });
  const cancelUpload = () =>{
    setForm({...form,image:''})
  }
  const pickImage = async () => {
    // Ask the user for the permission to access the camera and photo library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setForm({ ...form, image: result.assets[0] });
    }
  };

  

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setForm({ ...form, image: result.assets[0].uri });
    }
  };

  const submit = async() => {
    console.log('create.jsx -> formData after clicking submit ->',form)
    if(form.name === "" ||  form.location === "" || form.image ===""){
      return Alert.alert('Please fill all the fields') 
    }
    setUploading(true)

    try {
        await createShops({...form,userId:user.$id})
        Alert.alert('Success','post Uploaded')
        router.push('/home')
    } catch (error) {
      Alert.alert('Error',error.message)
      
    }finally{
      setForm({
        name: "",
        location: "",
        image: "",
      })
    }
    setUploading(false)
    // Submit form logic
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-white text-2xl font-psemibold">
          Create a Shop
        </Text>
        <FormField
          title="Shop name"
          value={form.name}
          placeholder="Give a name to the shop..."
          handleChangeText={(e) => setForm({ ...form, name: e })}
          otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Image
          </Text>
          <View className="flex-row justify-between">
            
            
              { form.image && <TouchableOpacity><Text className="text-base text-secondary-100 font-pmedium" onPress={cancelUpload}>
                Cancel
              </Text></TouchableOpacity>}
            
            <TouchableOpacity onPress={takePhoto}>
              <Text className="text-base text-secondary-100 font-pmedium">
                Capture a photo
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            {form.image ? (
              <Image
                source={{ uri: form.image.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                  <TouchableOpacity onPress={pickImage} className='justify-center items-center'>
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className=" w-1/2 h-1/2"
                  />
              
            
                </View>

                <Text className="text-base text-secondary-100 font-pmedium mt-5">
                Pick an image from gallery
              </Text>
            </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className='w-full h-20 px-4 bg-black-100 rounded-2xl justify-center items-center mt-7 space-y-2'>
          <Text className="text-base text-gray-100 font-pmedium">
            Add Location
          </Text>
        </View>
        <FormField
          title="Test Location"
          value={form.location}
          placeholder="Add a dummy location here..."
          handleChangeText={(e) => setForm({ ...form, location: e })}
          otherStyles="mt-10"
        />
        <CustomButton title='Add Store' handlePress={submit} containerStyles='mt-7' isLoading={uploading} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
