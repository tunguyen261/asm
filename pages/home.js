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
    title: "Normal Orchids",
    data: [
      {
        id: 1,
        title: "Miltonia Orchids",
        description: "Miltonia orchids are often called pansy orchids – except among the most experienced orchid enthusiasts. However, the term pansy orchid actually refers to Miltoniopsis orchids that closely resemble pansies. Although they don’t look like pansies, Miltonia orchids have large, attractive flowers that are worth the effort if you can coax yours to bloom.",
        image: "https://www.petalrepublic.com/wp-content/uploads/2021/05/Miltonia-Orchids-Miltonia.jpeg.webp",
        price: "$25.00",
        isFavorite: false,
      },
      {
        id: 2,
        title: "Venus Slipper",
        description: "The Paphiopedilum genus of orchids contains about 80 species and numerous hybrids of orchids that are commonly called venus slippers. Venus slipper orchids bloom with a single white flower that features attractive purple and/or green markings on its petals. These flowers are exceedingly difficult to propagate without seeds, which makes every Venus slipper unique.",
        image: "https://www.petalrepublic.com/wp-content/uploads/2021/05/Venus-Slipper-Paphiopedilum.jpeg.webp",
        price: "$30.00",
        isFavorite: false,
      },
      {
        id: 3,
        title: "Philippine Ground Orchid",
        description: "The Philippine ground orchid is an evergreen terrestrial orchid which means, as its common name suggests, that it grows in the ground, drawing nutrients and moisture up through its roots. It features clusters of delicate flowers in shades of vibrant violet, pale mauve, and the rarest snowy white.",
        image: "https://www.petalrepublic.com/wp-content/uploads/2021/05/Philippine-Ground-Orchid-Spathoglottis-plicata.jpeg.webp",
        price: "$35.00",
        isFavorite: false,
      },
      {
        id: 4,
        title: "The Black-Lipped Orchid",
        description: "The Coelogyne pandurata is commonly called the black-lipped orchid because its flowers have ghostly greenish-white petals with a striking black-striped center. These large beauties bloom with up to 15 flowers per raceme. At several inches in diameter, each blossom lasts about a week. Plus, these gorgeous orchids smell strongly of honey.",
        image: "https://www.petalrepublic.com/wp-content/uploads/2021/05/The-Black-Lipped-Orchid-Coelogyne-pandurata.jpeg.webp",
        price: "$18.50",
        isFavorite: false,
      },
      {
        id: 5,
        title: "Vanda Orchid",
        description: "Vanda orchids are prized for their stunning and vibrant flowers. They produce large blooms with broad, waxy petals and often display striking patterns and intense colors. Vanda orchids are epiphytes, meaning they grow on other plants, and they require bright light and regular watering to thrive.",
        image: "https://www.gardenia.net/storage/app/public/plant_family/detail/kFd2MRl9dP3Cs9LA4cKLdvqwpt5btxmkEnKhB3jM.webp",
        price: "$35.00",
        isFavorite: false,
      },
      {
        id: 6,
        title: "Vanilla Orchids",
        description: "With their alluring, creamy-white, tubular blossoms, the 110 species of orchids from the Vanilla genus are quite attractive. However, these plants are most widely prized for their use in vanilla flavoring, fragrance, and aromatherapy. The most popular species is the Vanilla planifolia, the seed pods of which are used to produce the popular commercial vanilla flavoring that everyone uses in baking.",
        image: "https://www.petalrepublic.com/wp-content/uploads/2021/05/Vanilla-Orchids-Vanilla.jpeg.webp",
        price: "$22.50",
        isFavorite: false,
      },
    ],
  },
  {
    title: "Animal Orchids",
    data: [
      {
        id: 1,
        title: "Monkey Orchid",
        description: "These are just about the cutest flowers you will ever see. The way the petals, lip, and column are arranged on these blossoms strongly resembles miniature monkeys – hence the common name “monkey orchid.” These orchid flowers come complete with smiling monkey faces, furry-looking scruff, lanky arms, and tails in the perfect shades of brown and creamy-white. If the adorable look of these flowers wasn’t enough to allure you, they also smell of fragrant oranges.",
        image: "https://www.petalrepublic.com/wp-content/uploads/2021/05/Monkey-Orchid-Dracula-simia.jpeg.webp",
        price: "$25.00",
        isFavorite: false,
      },
      {
        id: 2,
        title: "Cat’s Tail Orchids",
        description: "The genus of orchids, Aerides, gets its name from the Greek for “child of the air.” It’s an epiphytic orchid which means that its root system acts more like an anchor than a source of nutrients and moisture. These orchids are absolutely beautiful with tall racemes that simply burst with brightly colored flowers in shades of pink, purple, yellow, and white.",
        image: "https://www.petalrepublic.com/wp-content/uploads/2021/05/Cats-Tail-Orchids-Aerides.jpeg.webp",
        price: "$30.00",
        isFavorite: false,
      },
      {
        id: 3,
        title: "Lady’s Slipper Orchids",
        description: "The Cypripedium calceolus gets its common name “lady’s slipper” from its blossoms’ striking resemblance to tiny, little, yellow slippers surrounded by an array of spindly reddish-black petals. These orchids grow across Europe and Asia in woodlands, and they are a protected species in Europe. In Russian folklore, lady’s slippers are said to drive away evil spirits.",
        image: "https://www.petalrepublic.com/wp-content/uploads/2021/05/Jewel-Orchid-Ludisia.jpeg.webp",
        price: "$20.00",
        isFavorite: false,
      },
      {
        id: 4,
        title: "Epidendrum Orchids",
        description: "This genus of orchids contains about 1,500 species. Most of these have clusters of small to medium-sized brightly colored flowers in fiery hues. With three-lobed blossoms that resemble little crosses, epidendrum orchids are sometimes commonly referred to as crucifix orchids. These orchids are more easily grown indoors, but they can grow in gardens in the United States that have just the right temperature and humidity range.",
        image: "https://www.petalrepublic.com/wp-content/uploads/2021/05/Epidendrum-Orchids-Epidendrum.jpeg.webp",
        price: "$18.50",
        isFavorite: false,
      },
      {
        id: 5,
        title: "Tiger Orchid",
        description: "With blossoms featuring an array of yellowish-orange petals dappled in tiger-like spots and stripes of brown, the tiger orchid is stunningly beautiful. This species is also sometimes commonly referred to as the giant orchid because of its size. In fact, a tiger orchid that measured in at a towering 25 feet actually holds the Guinness Book of World Records title for the world’s tallest orchid.",
        image: "https://www.petalrepublic.com/wp-content/uploads/2021/05/Tiger-Orchid-Grammatophyllum-speciosum.jpeg.webp",
        price: "$20.00",
        isFavorite: false,
      },
      {
        id: 6,
        title: "Fox Tail Orchid",
        description: "The Rhynchostylis gigantea is a species of orchid that features a long inflorescence of blossoms that reaches about 15 inches in length and when in full bloom, it can resemble a fluffy fox tail. Due to this orchid’s wide distribution around the Asia continent, its flowers come in a range of colors and patterns. They can be solid magenta, red, or even spotted with white.",
        image: "https://www.petalrepublic.com/wp-content/uploads/2021/05/Fox-Tail-Orchid-Rhynchostylis-gigantea.jpeg.webp",
        price: "$22.50",
        isFavorite: false,
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
        alert("That orchids has already been added to the favorites list!");
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
    <Pressable onPress={viewItemDetails}>
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
        </View>
        <View style={styles.itemDetailsContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <Text style={styles.itemPrice}>{item.price}</Text>
        </View>
        <Ionicons
          name={item.isFavorite ? "heart" : "heart-outline"}
          size={24}
          color={item.isFavorite ? "red" : "black"}
          onPress={addToFavorites}
          style={styles.favoriteIcon}
        />
      </View>
    </Pressable>
  );
};

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Load any necessary data or perform any actions on component mount
  }, []);

  const renderItem = ({ item }) => <Item item={item} />;

  const onPressShowAll = () => {
    setSelectedCategory(null);
  };

  // Filter the menuItemsToDisplay based on the selectedCategory
  const filteredData = selectedCategory
    ? menuItemsToDisplay.find((section) => section.title === selectedCategory)
    : menuItemsToDisplay;

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Pressable onPress={onPressShowAll} style={styles.button}>
          <Text style={styles.buttonText}>Show All</Text>
        </Pressable>
        {menuItemsToDisplay.map((section) => (
          <Pressable
            key={section.title}
            onPress={() => setSelectedCategory(section.title)}
            style={[
              styles.button,
              selectedCategory === section.title && styles.selectedButton,
            ]}
          >
            <Text style={styles.buttonText}>{section.title}</Text>
          </Pressable>
        ))}
      </View>

      {!selectedCategory && (
        <SectionList
          sections={menuItemsToDisplay}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}

      {selectedCategory && (
        <SectionList
          sections={[filteredData]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  buttonCategory:{
    backgroundColor: "red",
    color: "green",
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "green",
    color: "white",
    marginRight: 8,
  },
  selectedButton: {
    backgroundColor: "gray",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  headerStyle: {
    backgroundColor: "#eaeaea",
    padding: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    borderColor: "green",
    borderWidth: 3,

  },
  imageContainer: {
    marginRight: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetailsContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 14,
    color: "gray",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
  },
  favoriteIcon: {
    marginLeft: "auto",
  },
});

export default Home;
