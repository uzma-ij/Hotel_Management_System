import { BottomTabBar } from "@react-navigation/bottom-tabs";
import React from "react";
import {View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Details } from "./Details";
import { useNavigation } from '@react-navigation/native';
import {useState} from 'react';



export const Dashboard = () => {
  const navigation = useNavigation();
  
  const [selectedHotelId, setSelectedHotelId] = useState(null); // State to keep track of selected hotel ID

  const handlepress = (hotelId) => {
    setSelectedHotelId(hotelId); // Set selected hotel ID when pressed
    navigation.navigate('Details', { hotelId }); // Navigate to Details screen with hotel ID
  };
  // const handlepress = (hotel) => {
  //   setSelectedHotel(hotel); // Set selected hotel when pressed
  //   navigation.navigate('Details', { hotel }); // Navigate to Details screen with hotel info
  // };

  // const handlepress = () => {
  //     navigation.navigate('Details');
  //   };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.txt1}>Explore</Text>
      <TextInput
        placeholder="Search"
        placeholderTextColor={"black"}
        style={styles.textfield}
      />
      <FlatList
        data={localhotel}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.5} style={{ marginBottom: 30 }} onPress={() => handlepress(item.id)}>
            <View>
              <HotelImage image={item.image} />
              <HotelInfo 
                Name={item.Name}
                Country={item.Country}
                Price={item.Price}
              />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        style={{ marginLeft: 10, marginRight: 10 }}
      />
      
    </SafeAreaView>
  );
};


const localhotel = [
  {
    id:1,
    Name: 'Rosewood Hong Kong',
    Country: 'Hong Kong',
    Price: '$500/per night',
    image: require("./Images/hotel1.jpg")
  },
  {
    id:2,
    Name: 'The Maybourne Riviera',
    Country: 'France',
    Price: '$650/per night',
    image: require("./Images/hotel2.jpg")
  },
  {
    id:3,
    Name: 'Eden Rock',
    Country: 'Saint Barthelemy',
    Price: '$1700/per night',
    image: require("./Images/hotel3.jpg")
  },
  {
    id:4,
    Name: 'Equinox Hotel New York',
    Country: 'New York City',
    Price: '$900/per night',
    image: require("./Images/hotel4.jpg")
  },
  // {
  //   Name: 'Soneva Fushi',
  //   Country: 'Maldives',
  //   Price: '$2800/per night',
  //   image: require("./Images/hotel5.jpg")
  // },
  // {
  //   Name: 'Mandarin Oriental Bangkok',
  //   Country: 'Thailand',
  //   Price: '$757/per night',
  //   image: require("./Images/hotel6.jpg")
  // },
  // {
  //   Name: 'Claridge',
  //   Country: 'London',
  //   Price: '$1200/per night',
  //   image: require("./Images/hotel7.jpeg")
  // }
];

const HotelImage = (props) => {
  return (
    <View style={{ marginTop:10 }}>
      <Image style={styles.img} source={props.image} />
    </View>
  );
};

const HotelInfo = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
      }}
    >
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          {props.Name}
        </Text>
        <Text>{props.Country}</Text>
      </View>
      <Text style={{ fontWeight: "bold", fontSize: 15, color: "grey" }}>
        {props.Price}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginBottom:10
  },
  img: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    paddingTop:30,
  },
  txt1: {
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 20,
    marginLeft: 10,
  },
  textfield: {
    borderRadius: 15,
    paddingLeft: 15,
    height: "6%",
    width: "94%",
    backgroundColor: "rgb(220,235,270)",
    marginTop:20,
    marginLeft: 10,
  },
});


