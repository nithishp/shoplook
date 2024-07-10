  import {
    View,
    Text,
    FlatList,
    Image,
    RefreshControl,
    Alert,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { useGlobalContext } from "../../context/GlobalProvider";
  import { images } from "../../constants";
  import SearchInput from "../../components/SearchInput";
  import Trending from "../../components/Trending";
  import EmptyState from "../../components/EmptyState";
  import {  getAllStores,getLatestShops } from "../../lib/appwrite";
  import useAppwrite from "../../lib/useAppwrite";
  import ShopCard from '../../components/ShopCard'

  const Home = () => {
    const {data:shops,refetch} = useAppwrite(getAllStores)
    const {data:latestShops} = useAppwrite(getLatestShops)
    const { user } = useGlobalContext();
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
      setRefreshing(true);
      await refetch()
      setRefreshing(false);
    };
    return (
      <View>
        <SafeAreaView className="bg-primary h-full">
          <FlatList
            data={shops}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
              <ShopCard shop = {item}/>
            )}
            ListHeaderComponent={() => (
              <View className=" my-6 px-4 space-y-6">
                <View className=" justify-between items-start flex-row mb-6">
                  <View>
                    <Text className="font-pmedium text-sm text-gray-100">
                      Welcome Back
                    </Text>
                    <Text className="text-2xl font-psemibold text-white">
                      {user?.username}
                    </Text>
                  </View>
                  <View className="mt-1.5">
                    <Image
                      source={images.logoSmall}
                      className="w-9 h-10"
                      resizeMode="contain"
                    />
                  </View>
                </View>

                <SearchInput />
                <View className="w-full flex-1 pt-5 pb-8">
                  <Text className=" text-gray-100 txet-lg font-pregular mb-3">
                    Latest Videos
                  </Text>
                  <Trending shops={latestShops ?? []} />
                </View>
              </View>
            )}
            ListEmptyComponent={() => (
              <EmptyState
                title="No shops Found"
                subtitle="Be the first one to add a store!"
              />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </SafeAreaView>
      </View>
    );
  };

  export default Home;
