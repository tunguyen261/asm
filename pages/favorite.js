import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    try {
      const favoritesData = await AsyncStorage.getItem("favorites");
      if (favoritesData) {
        const favoritesArray = JSON.parse(favoritesData);
        setFavorites(favoritesArray);
      }
    } catch (error) {
      console.log("Error loading favorites:", error);
    }
  };

  const deleteAllFavorites = async () => {
    try {
      await AsyncStorage.removeItem("favorites");
      setFavorites([]);
      console.log("Removing All Favorites");
    } catch (error) {
      console.log("Fail to remove all favorites");
    }
  };
  
  const deleteFavorite = async (item) => {
    try {
      const updatedFavorites = favorites.filter((favorite) => favorite.title !== item.title);
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } catch (error) {
      console.log("Error deleting favorite:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemPrice}>{item.price}</Text>
      <Pressable
        style={styles.deleteButton}
        onPress={() => deleteFavorite(item)}
      >
        <Ionicons name="trash-outline" size={20} color="red" />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={deleteAllFavorites}>
        <Ionicons name="trash-outline" size={30} selectionColor={"red"} />
        <Text>Delete All</Text>
      </Pressable>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.title + index}
        />
      ) : (
        <Text style={styles.emptyText}>No favorites yet</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
  },
  itemContainer: {
    margin: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "green",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#CCCCCC",
  },
  itemImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "transparent",
    padding: 5,
  },
  itemTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: "white",
  },
  emptyText: {
    fontSize: 20,
    alignSelf: "center",
    marginTop: 50,
  },
  button: {
    margin: 10,
    padding: 5,
    backgroundColor: "yellow",
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Favorite;
