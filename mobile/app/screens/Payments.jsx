import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Payments = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Plan</Text>
      <Button title="Subscribe for $9.99/month" onPress={() => {}} color="#FF6A00" />
      <Button title="Go Back" onPress={() => navigation.goBack()} color="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  title: {
    fontSize: 24,
    color: '#FF6A00',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default Payments;
