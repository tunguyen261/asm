import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import Toast from 'react-native-toast-message';
import Ionicons from "react-native-vector-icons/Ionicons";

const Detail = ({ route }) => {
  const { item } = route.params;
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
      Toast.show({
        type: 'success',
        text1: 'Item added to favorites',
        position: 'bottom',
        visibilityTime: 2000, // 2 seconds
        autoHide: true,
        topOffset: 60, // Adjust the position as needed
      });
    } catch (error) {
      console.log("Error adding item to favorites:", error);
    }
  };
  
  
  return (
    <View style={detailStyles.container}>
      <View style={detailStyles.imageContainer}>
      <Image source={{ uri: item.image }} style={detailStyles.itemImage} />
      </View>
      <View style={detailStyles.infoDetail}>
        <Text style={detailStyles.itemTitle}>{item.title}</Text>
        <Text style={detailStyles.itemPrice}>{item.price}</Text>
      </View>
      <View style={detailStyles.infoDetail}>
        <Text style={detailStyles.description}>{item.description}</Text>
      </View>

      {/* Render other details of the item here */}
      <Pressable style={detailStyles.favorButton} onPress={addToFavorites}>
        <Text style={detailStyles.buttonTitle}>Add To Favorite</Text>
        <Ionicons
          name="heart-sharp"
          size={30}
          color={"red"}
          selectionColor={"red"}
        />
      </Pressable>
    </View>
  );
};

const detailStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  buttonTitle:{
    color: 'black',
    paddingRight: 10,
    fontSize: 20,
  },
  favorButton:{
    width: 300,
    borderRadius: 20,
    borderWidth: 3,
    left: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center"
  },
  imageContainer: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
  },
  description:{
    color: 'black',
    fontSize: 15,
    width: 300,
    paddingBottom: 20
  },
  infoDetail: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  itemImage: {
    width: 300,
    height: 250,
    borderRadius: 20,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    paddingRight: 20,
  },
  itemPrice: {
    color: "black",
    fontSize: 25,
    marginBottom: 10,
  },
});

export default Detail;
