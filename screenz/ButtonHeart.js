import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { app } from './Firebase';  // Import firestore
//import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getFirestore, collection, addDoc } from 'firebase/firestore';



export const ButtonHeart = (props) => {
  const navigation = useNavigation();
  const { selectedHotel } = props;  // Assuming selectedHotel contains the necessary data
  const Hotelname= selectedHotel.title;
  const hotelimage= selectedHotel.img;
  const hotelprice = selectedHotel.price;
  const hotellocation = selectedHotel.location;

  const [isLiked, setIsLiked] = useState(false);

  const handlewishlist = async () => {
    setIsLiked(!isLiked);
    try {
      const db = getFirestore(app);
      const wishlistData = {
        hotelId: 1,
        hotelName: Hotelname,
        hotelImage: hotelimage,
        location :hotellocation,
        Price:hotelprice,
        
        
      };
      await addDoc(collection(db, 'wishlist'), wishlistData);
     // alert(`Booking confirmed! Total price: ${price}`);
     console.log("added to wishlist");

    } catch (error) {
      console.error("Error adding to wishlist: ", error);
      alert("faild to add to wishlist.");
    }
  };


  const handleToggleLike = async () => {
    setIsLiked(!isLiked);
    try {
      if (!isLiked) {
        // Add hotel to wishlist in Firestore
        await firestore.collection('wishlist').add({
          image: selectedHotel.img,
          title: selectedHotel.title,
          location: selectedHotel.location,
          price: selectedHotel.price,
          addedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        console.log('Hotel added to wishlist');
      } else {
        // Optionally handle unliking, such as removing from Firestore
        console.log('Hotel removed from wishlist');
      }
     // navigation.navigate("Wishlist", { selectedHotel });
    } catch (error) {
      console.error('Error adding hotel to wishlist: ', error);
    }
  };

  const handleBookHotel = () => {
    console.log('Book hotel pressed');
    navigation.navigate("BookHotel", { selectedHotel });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={handlewishlist}
        activeOpacity={0.7}
      >
        <Image
          source={isLiked ? require('./Images/redheart.png') : require('./Images/heart1.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleBookHotel}
      >
        <Text style={styles.buttonLabel}>Book Hotel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  icon: {
    width: 35,
    height: 35,
  },
  buttonContainer: {
    backgroundColor: 'blue',
    paddingHorizontal: 70,
    paddingVertical: 15,
    borderRadius: 8,
    marginRight: 20,
   
   
  },
  buttonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
