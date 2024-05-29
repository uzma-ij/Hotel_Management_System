import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { app } from './Firebase'; // Make sure to import your Firebase config
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export const Mybookings = (props) => {
  const [bookings, setBookings] = useState([]);
  const navigation = useNavigation(); // Use useNavigation hook to get navigation object

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const db = getFirestore(app);
        const querySnapshot = await getDocs(collection(db, 'AllBookings'));
        const bookingsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBookings(bookingsList);
      } catch (error) {
        console.error("Error fetching bookings: ", error);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    try {
      const db = getFirestore(app);
      await deleteDoc(doc(db, 'AllBookings', id));
      setBookings(bookings.filter(booking => booking.id !== id));
    } catch (error) {
      console.error("Error deleting booking: ", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.backButton}>
          <Icon name="arrow-back" size={25} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Bookings</Text>
      </View>
      <FlatList
        data={bookings}
        renderItem={({ item }) => (
          <View style={styles.bookingContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.hotelName}>{item.hotelName}</Text>
              <View style={styles.detailRow}>
                <Text style={styles.detailText}>Guests: {item.Guests}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailText}>Rooms: {item.Rooms}</Text>
              </View>
              <Text style={styles.detailText}>Check-in: {formatDate(item.checkIn)}</Text>
              <Text style={styles.detailText}>Check-out: {formatDate(item.checkOut)}</Text>
              <Text style={styles.price}>Price: ${item.Price}/per night</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={{ marginLeft: 10, marginRight: 10 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
    flex: 1,
   // textAlign: 'center',
  },
  bookingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f8f8f8', // Light grey background for booking cards
  },
  infoContainer: {
    flex: 1,
  },
  hotelName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#34495e', // Dark color for hotel name
    marginBottom: 5,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  detailText: {
    color: 'gray',
    fontSize: 14,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'seagreen',
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
    marginTop: 100
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
