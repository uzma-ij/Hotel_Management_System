import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  useState,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { AminitiesList } from "./AminitiesList";
import { ButtonHeart } from "./ButtonHeart";
import { useRoute } from '@react-navigation/native';



const Eachhotelinfo = [
  {
    id: 1,
    img: require("./Images/hotel1.1.jpg"),
    title: "Rosewood Hong Kong",
    location: "Hong Kong",
    description:
      "From its perch amid private grounds in Moltrasio, the hotel’s 24 rooms are spread out over three buildings: the main villa, the eight-room Palazz (housed in the former stables with giant original exposed beams).",
    price: 150,
    review: 5,
  },
  {
    id: 2,
    img: require("./Images/hotel2.1.jpg"),
    title: "The Maybourne Riviera",
    location: "France",
    description:
      "The arresting exterior by veteran French architect Jean-Michel Wilmotte has ample floor-to-ceiling windows and white colouring that allows the bright, elegant light of the French Riviera to filter into minimalist interiors",
    price: 650,
    review: 4,
  },
  {
    id: 3,
    img: require("./Images/hotel3.1.jpg"),
    title: "Saint Barthelemy",
    location: "Saint Barthelemy",
    description:
      "Eden Rock’s signature red roofs stand out from its perch  in the centre of St. Barths lush north coast. Overlooking the crystal-clear waters of St Jean, the resort’s hub are the buildings that sit on the edge of the rocks.",
    price: 1700,
    review: 3,
  },
  {
    id: 4,
    img: require("./Images/hotel4.1.jpg"),
    title: "Equinox Hotel New York",
    location: "New York City",
    description:
      "The hotel has ambitions to improve guests’ rest via king-sized beds, all-natural bed linens and remotely operated blackout curtains. Room temperatures can be transfigured via an in-room tablet to ensure optimal sleeping.",
    price: "150",
    review: 3,
  },
];

const amenities = [
  { id: 1, name: "Parking", icon: "car" },
  { id: 2, name: "Bath", icon: "bath" },
  { id: 3, name: "Bar", icon: "glass" },
  { id: 4, name: "Wifi", icon: "wifi" },
  { id: 5, name: "Gym", icon: "heartbeat" },
];
//const route =useRoute();
export const Details = (props) => {
  const route = useRoute(); 
  const { hotelId } = route.params; 
  

  const selectedHotel = Eachhotelinfo.find((hotel) => hotel.id === hotelId);

  return (
    //image
    //details
    //price,reviews
    //aminities
    //heart icon + button
    <View style={{ flex: 1, backgroundColor: "white" }}>
       <HotelImage image={selectedHotel.img} />
      <Hoteldescription
        title={selectedHotel.title}
        location={selectedHotel.location}
        description={selectedHotel.description}
      />
      <Hotelprice price={selectedHotel.price} review={selectedHotel.review} />
      <AminitiesList amenities={amenities} />
      <ButtonHeart selectedHotel={selectedHotel}/>
          </View>
    
  );
};

const Hotelprice = (props) => {
  const { review } = props; // Destructuring review from props
  return (
    <View
      style={{
        marginTop: 10,
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "white",
      }}
    >
      <View>
        <Text style={{ fontSize: 20 }}>Price</Text>
        <Text style={{ fontSize: 20 }}>{props.price}</Text>
      </View>

      <View style={{ paddingHorizontal: 80, flex: 1 }}>
        <Text style={{ fontSize: 20 }}>Review</Text>

        <StarRating rating={props.review} />
        {/* {review && <StarRating rating={review.rating} />} */}
      </View>
    </View>
  );
};


const HotelImage = (props) => {
  return (
    <View>
      <Image style={{ width: "100%", height: 270 }} source={props.image} />
    </View>
  );
};

const StarRating = (props) => {
  const rating = props.rating;
  const filledStars = Math.floor(rating);

  return (
    <View style={styles.container}>
      {[...Array(5)].map((_, index) => (
        <View key={index} style={styles.starContainer}>
          <Image
            source={
              index < filledStars
                ? require("./Images/yellowstar.png")
                : require("./Images/star1.png")
            }
            style={styles.starIcon}
          />
        </View>
      ))}
      <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    
  },
  starContainer: {
    marginRight: 2, // Adjust spacing between stars
  },
  starIcon: {
    width: 24, // Adjust the width and height according to your star image size
    height: 24,
    tintColor: "yellow", // Apply blue tint to the stars
    resizeMode: "contain",
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#333333",
  },
});

// const StarRating = ({ rating }) => {
//   const filledStars = Math.floor(rating);
//   const emptyStars = 5 - filledStars;

//   return (
//     <View style={styles.container}>
//       {[...Array(5)].map((_, index) => (
//         <View key={index} style={styles.starContainer}>
//           <ImageBackground
//             source={require('./Images/star1.png')} // Filled star image
//             style={styles.starImage}
//             imageStyle={index < filledStars && styles.maskImage}
//           >
//             <Image source={require('./Images/star1.png')} style={styles.maskImage} />
//           </ImageBackground>
//         </View>
//       ))}
//       <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   starContainer: {
//     marginRight: 2, // Adjust spacing between stars
//   },
//   starImage: {
//     width: 24, // Adjust the width and height according to your star image size
//     height: 24,
//   },
//   maskImage: {
//     tintColor: 'blue', // Apply yellow tint to the mask
//     //resizeMode: 'contain',
//   },
//   ratingText: {
//     marginLeft: 5,
//     fontSize: 16,
//     color: '#333333',
//   },
// });

const Hoteldescription = (props) => {
  return (
    <View
      style={{
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
      }}
    >
      <Text style={{ fontWeight: "500", fontSize: 25 }}>{props.title}</Text>
      <Text style={{ fontSize: 15, fontWeight: "500" }}>{props.location}</Text>

      <Text style={{ fontSize: 17, color: "grey", marginTop: 15 }}>
        {props.description}
      </Text>
    </View>
  );
};
