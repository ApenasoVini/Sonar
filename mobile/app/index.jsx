import React from 'react';
import { Text, Image, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function SignUp() {
  return (
    <LinearGradient
      colors={['#000000', '#232323']}
      style={styles.container}
    >
      <Image style={styles.img} source={require('../assets/logo.png')} />
      <Text style={styles.title}>Bem vindo!</Text>
      <Pressable onPress={() => router.push("/screens/SignIn")} style={styles.press}>
        <Text style={styles.text}>Login</Text>
      </Pressable>
      <Pressable onPress={() => router.push("/screens/SignUp")} style={styles.press}>
        <Text style={styles.text}>Cadastrar</Text>
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  img: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 32,
    color: '#FF6A00',
    marginBottom: 20,
    textAlign: 'center',
  },
  press: {
    width: '50%',
    marginVertical: 10,
    height: 45,
    justifyContent: 'center',
    backgroundColor: '#FF6A00',
  },
  text: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: 15
  },
});