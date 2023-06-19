import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Detail = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={detailStyles.container}>
      <Image source={{ uri: item.image }} style={detailStyles.itemImage} />
      <Text style={detailStyles.itemTitle}>{item.title}</Text>
      <Text style={detailStyles.itemPrice}>{item.price}</Text>
      {/* Render other details of the item here */}
    </View>
  );
};

const detailStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  itemImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemPrice: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Detail;