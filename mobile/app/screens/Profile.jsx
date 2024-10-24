import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
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
      <Pressable title="Edit Profile" onPress={() => { }} color="#FF6A00">
        <Text>Concluir</Text>
      </Pressable>
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