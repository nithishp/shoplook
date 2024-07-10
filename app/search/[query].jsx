import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { searchShops } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import ShopCard from "../../components/ShopCard";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: shops, refetch } = useAppwrite(() => searchShops(query));
  useEffect(() => {
    refetch();
  }, [query]);
  return (
    <View>
      <SafeAreaView className="bg-primary h-full">
        <FlatList
          data={shops}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => <ShopCard shop={item} />}
          ListHeaderComponent={() => (
            <View className=" my-6 px-4 ">
              <Text className="font-pmedium text-sm text-gray-100">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-white">
                {query}
              </Text>
              <View className="mt-6 mb-8">
                <SearchInput intialQuery={query} />
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No shops Found"
              subtitle="No shops found in this name!"
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
};

export default Search;
