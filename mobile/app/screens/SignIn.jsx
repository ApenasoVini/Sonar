import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';

const SignIn = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem vindo de volta!</Text>
      <TextInput placeholder="Email" style={styles.input} inputMode='email' placeholderTextColor="#ccc" />
      <TextInput placeholder="Senha" secureTextEntry style={styles.input} placeholderTextColor="#ccc" />
      <Pressable style={styles.press} onPress={() => router.push("/screens/Home")}>
        <Text style={styles.pressText}>Entrar</Text>
      </Pressable>
      <View style={styles.signup}>
        <Text style={styles.signupText}>Não tem uma conta? </Text>
        <Text style={styles.signupLink} onPress={() => router.push("/screens/SignUp")}>Cadastar</Text>
      </View>
    </View >
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
    fontSize: 32,
    color: '#FF6A00',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    color: '#fff',
    backgroundColor: '#2A2A2A',
  },
  press: {
    backgroundColor: '#FF6A00',
    width: '100%',
    paddingVertical: 12
  },
  pressText: {
    color: '#FFF',
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  signup: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#fff',
  },
  signupLink: {
    color: '#FF6A00',
  },
});

export default SignIn;
