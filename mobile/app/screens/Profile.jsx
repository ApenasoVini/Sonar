import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function Profile() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#000000', '#232323']}
        style={styles.parallax}
      >
        <Image source={require('../../assets/profile.png')} style={styles.icon} />
        <Text style={styles.name}>John Doe</Text>
      </LinearGradient>
      <Text style={styles.info}>Email: john.doe@example.com</Text>
      <Button title="Edit Profile" onPress={() => { }} color="#FF6A00" />
      <Button title="Logout" onPress={() => router.push("/screens/SignIn")} color="#FF6A00" />
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1A1A1A',
  },
  title: {
    fontSize: 32,
    color: '#FF6A00',
    marginBottom: 20,
    textAlign: 'center',
  },
  info: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
});