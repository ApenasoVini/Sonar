import React from 'react';
import { Text, Image, Pressable, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function SignUp() {
  return (
    <LinearGradient
      colors={['#000000', '#232323']}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.img} source={require('../assets/logo.png')} />
      </View>
      <Text style={styles.title}>Bem vindo a Sonar!</Text>
      <Text style={styles.desc}>O melhor App de músicas</Text>
      <Pressable onPress={() => router.push('/screens/SignUp')} style={styles.press1}>
        <Text style={styles.text1}>Sign up</Text>
      </Pressable>
      <Pressable onPress={() => router.push('/screens/SignIn')} style={styles.press2}>
        <Text style={styles.text2}>Sign in</Text>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  img: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  desc: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  press1: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6A00',
    borderRadius: 25,
    marginVertical: 10,
  },
  press2: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 25,
    marginVertical: 10,
  },
  text1: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text2: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
