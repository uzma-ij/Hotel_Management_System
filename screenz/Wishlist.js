import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import { app } from './Firebase';
import Icon from 'react-native-vector-icons/Ionicons';


//custome flatlist is used here
export const Wishlist = ({ navigation }) => {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    try {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, 'wishlist'));
      const wishlistData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWishlist(wishlistData);
    } catch (error) {
      console.error('Error fetching wishlist: ', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchWishlist();
    }, [])
  );

  const handleDelete = async (id) => {
    try {
      const db = getFirestore(app);
      await deleteDoc(doc(db, 'wishlist', id));
      setWishlist(wishlist.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting wishlist item: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.backButton}>
          <Icon name="arrow-back" size={25} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Wishlist</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {wishlist.map(item => (
          <View style={styles.boundary} key={item.id}>
            <View style={styles.hotelContainer}>
              <HotelImage image={item.hotelImage} />
              <HotelInfo
                Name={item.hotelName}
                Country={item.location}
                Price={item.Price}
              />
              <TouchableOpacity
                style={styles.deleteIconContainer}
                onPress={() => handleDelete(item.id)}
              >
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const HotelImage = (props) => {
  return (
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={props.image} />
    </View>
  );
};

const HotelInfo = ({ Name, Country, Price }) => {
  return (
    <View style={styles.infoContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.hotelName}>
          {Name}
        </Text>
        <Text style={styles.locationContainer}>{Country}</Text>
        <Text style={styles.price}>{Price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  backButton: {
    paddingRight: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  scrollView: {
    marginLeft: 10,
    marginRight: 10,
  },
  boundary: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  hotelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  imageContainer: {
    marginTop: 10,
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginLeft: 10,
  },
  textContainer: {
    flex: 1,
  },
  hotelName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  locationContainer: {
    color: 'gray',
    fontSize: 14,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 20,
    color: 'seagreen',
  },
  deleteIconContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

//export default Wishlist;
