import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export const AminitiesList = ({ amenities }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Amenities</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.amenitiesContainer}>
          {amenities.map(amenity => (
            <View key={amenity.id} style={styles.amenityItem}>
              <View style={styles.amenityIconContainer}>
                <Icon name={amenity.icon} size={24} color="#333" />
              </View>
              <Text style={styles.amenityName}>{amenity.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginLeft: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amenityItem: {
    marginRight: 20,
    alignItems: 'center',
  },
  amenityIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amenityName: {
    marginTop: 5,
    textAlign: 'center',
  },
});

