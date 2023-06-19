import {
  View,
  Text,
  StyleSheet,
  SectionList,
  Pressable,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const menuItemsToDisplay = [
  {
    title: "Nike",
    data: [
      {
        id: 1,
        title: "Hummus",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR12X5nCfMdPVbGOC_cbCi_JG6dAMhXmJpcMw&usqp=CAU",
        price: "$5.00",
      },
      { id: 2, title: "Moutabal", image: "nike_image_2.jpg", price: "$5.00" },
      { id: 3, title: "Falafel", image: "nike_image_3.jpg", price: "$7.50" },
      {
        id: 4,
        title: "Marinated Olives",
        image: "nike_image_4.jpg",
        price: "$5.00",
      },
      { id: 5, title: "Kofta", image: "nike_image_5.jpg", price: "$5.00" },
      {
        id: 6,
        title: "Eggplant Salad",
        image: "nike_image_6.jpg",
        price: "$8.50",
      },
    ],
  },
  {
    title: "Adidas",
    data: [
      {
        id: 7,
        title: "Lentil Burger",
        image: "adidas_image_1.jpg",
        price: "$10.00",
      },
      {
        id: 8,
        title: "Smoked Salmon",
        image: "adidas_image_2.jpg",
        price: "$14.00",
      },
      {
        id: 9,
        title: "Kofta Burger",
        image: "adidas_image_3.jpg",
        price: "$11.00",
      },
      {
        id: 10,
        title: "Turkish Kebab",
        image: "adidas_image_4.jpg",
        price: "$15.50",
      },
    ],
  },
  {
    title: "Puma",
    data: [
      { id: 11, title: "Hummus", image: "puma_image_1.jpg", price: "$5.00" },
      { id: 12, title: "Moutabal", image: "puma_image_2.jpg", price: "$5.00" },
      { id: 13, title: "Falafel", image: "puma_image_3.jpg", price: "$7.50" },
      {
        id: 14,
        title: "Marinated Olives",
        image: "puma_image_4.jpg",
        price: "$5.00",
      },
      { id: 15, title: "Kofta", image: "puma_image_5.jpg", price: "$5.00" },
      {
        id: 16,
        title: "Eggplant Salad",
        image: "puma_image_6.jpg",
        price: "$8.50",
      },
    ],
  },
];

const Item = ({ item }) => {
  const navigation = useNavigation();

  const viewItemDetails = () => {
    navigation.navigate("Detail", { item });
  };

  const addToFavorites = async () => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      let favoritesArray = [];
      if (favorites) {
        favoritesArray = JSON.parse(favorites);
      }

      // Check if the item with the same ID already exists in favorites
      const existingItem = favoritesArray.find(
        (favItem) => favItem.id === item.id
      );
      if (existingItem) {
        console.log("Item already exists in favorites");
        alert("That shoe has already been added to the favorites list!");
        return;
      }

      favoritesArray.push(item);
      await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
      console.log("Item added to favorites:", item);
    } catch (error) {
      console.log("Error adding item to favorites:", error);
    }
  };

  return (
    <View style={menuStyles.innerContainer}>
      <View style={menuStyles.imageContainer}>
        <Image source={{ uri: item.image }} style={menuStyles.itemImage} />
      </View>
      <View style={menuStyles.itemInfoContainer}>
        <Text style={menuStyles.itemText}>{item.title}</Text>
        <Text style={menuStyles.itemText}>{item.price}</Text>
      </View>
      <Pressable onPress={viewItemDetails}>
        <Ionicons
          name="eye-outline"
          size={30}
          color={"white"}
          selectionColor={"red"}
        />
      </Pressable>
      <Pressable onPress={addToFavorites}>
        <Ionicons
          name="heart-sharp"
          size={30}
          color={"white"}
          selectionColor={"red"}
        />
      </Pressable>
    </View>
  );
};

const Home = ({ navigation }) => {
  const renderItem = ({ item }) => <Item item={item} />;
  const renderSectionHeader = ({ section: { title } }) => (
    <View style={menuStyles.headerStyle}>
      <Text style={menuStyles.sectionHeader}>{title}</Text>
    </View>
  );

  return (
    <View style={menuStyles.container}>
      <SectionList
        sections={menuItemsToDisplay}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
    </View>
  );
};

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
  },
  innerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  imageContainer: {
    marginRight: 10,
  },
  itemText: {
    color: "#F4CE14",
    fontSize: 20,
  },
  headerStyle: {
    backgroundColor: "#F4CE14",
  },
  sectionHeader: {
    color: "black",
    fontSize: 26,
    flexWrap: "wrap",
    textAlign: "center",
  },
});

export default Home;
