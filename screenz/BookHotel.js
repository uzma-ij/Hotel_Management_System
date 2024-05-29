import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from './Firebase'; // Ensure your Firebase is initialized here



export const BookHotel = () => {
  const route = useRoute();
  const { selectedHotel } = route.params;
  const initialPrice = parseFloat(selectedHotel.price); // Ensure initialPrice is a number
  const hotelname = selectedHotel.title;
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [price, setPrice] = useState(initialPrice);

  useEffect(() => {
    console.log("Initial price type:", typeof selectedHotel.price, "value:", selectedHotel.price);
  }, []);

  const calculatePrice = (guests, rooms) => {
    let additionalPrice = 0;
    if (guests > 1) {
      console.log("value of guests", guests);
      additionalPrice += (guests - 1) * 20;
    }
    if (rooms > 1) {
      additionalPrice += (rooms - 1) * 20;
    }
    const totalPrice = initialPrice + additionalPrice;
    console.log("total price is", totalPrice);
    setPrice(totalPrice);
  };

  const onCheckInChange = (event, selectedDate) => {
    const currentDate = selectedDate || checkInDate;
    setShowCheckIn(false);
    setCheckInDate(currentDate);
  };

  const onCheckOutChange = (event, selectedDate) => {
    const currentDate = selectedDate || checkOutDate;
    setShowCheckOut(false);
    setCheckOutDate(currentDate);
  };

  const handleBooking = async () => {
    try {
      const db = getFirestore(app);
      const bookingData = {
        hotelId: 1,
        hotelName: hotelname,
        checkIn: checkInDate.toISOString(),  // Convert Date object to string
        checkOut: checkOutDate.toISOString(), // Convert Date object to string
        Rooms: rooms,
        Guests: guests,
        Price: price,
      };
      await addDoc(collection(db, 'AllBookings'), bookingData);
      alert(`Booking confirmed! Total price: ${price}`);
    } catch (error) {
      console.error("Error booking hotel: ", error);
      alert("Failed to book hotel. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Your Hotel!</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Check in</Text>
        <Text style={styles.dateInput} onPress={() => setShowCheckIn(true)}>
          {checkInDate.toDateString()}
        </Text>
        {showCheckIn && (
          <DateTimePicker
            value={checkInDate}
            mode="date"
            display="default"
            onChange={onCheckInChange}
          />
        )}

        <Text style={styles.label}>Check out</Text>
        <Text style={styles.dateInput} onPress={() => setShowCheckOut(true)}>
          {checkOutDate.toDateString()}
        </Text>
        {showCheckOut && (
          <DateTimePicker
            value={checkOutDate}
            mode="date"
            display="default"
            onChange={onCheckOutChange}
          />
        )}

        <Text style={styles.label}>Rooms</Text>
        <Picker
          selectedValue={rooms}
          style={styles.picker}
          onValueChange={(itemValue) => {
            setRooms(itemValue);
            calculatePrice(guests, itemValue);
          }}
        >
          {[...Array(10).keys()].map(i => (
            <Picker.Item key={i + 1} label={`${i + 1}`} value={i + 1} />
          ))}
        </Picker>

        <Text style={styles.label}>Guests</Text>
        <Picker
          selectedValue={guests}
          style={styles.picker}
          onValueChange={(itemValue) => {
            setGuests(itemValue);
            calculatePrice(itemValue, rooms);
          }}
        >
          {[...Array(10).keys()].map(i => (
            <Picker.Item key={i + 1} label={`${i + 1}`} value={i + 1} />
          ))}
        </Picker>

        <Text style={styles.label}>Price: ${price}</Text>
        <TouchableOpacity style={styles.button} onPress={handleBooking}>
          <Text style={styles.buttonText}>Book Hotel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 25,
    color: 'green',
  },
  form: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 20,
  },
  dateInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
  },
  picker: {
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
