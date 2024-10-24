import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';

const SignUp = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crie sua conta</Text>
      <TextInput placeholder="Nome" style={styles.input} inputMode='text' placeholderTextColor="#ccc" />
      <TextInput placeholder="Sobrenome" style={styles.input} inputMode='text' placeholderTextColor="#ccc" />
      <TextInput placeholder="Email" style={styles.input} inputMode='email' placeholderTextColor="#ccc" />
      <TextInput placeholder="Data de Nascimento" style={styles.input} placeholderTextColor="#ccc" />
      <TextInput placeholder="Senha" secureTextEntry style={styles.input} placeholderTextColor="#ccc" />
      <Pressable style={styles.press} onPress={() => router.push("/screens/Payments")}>
        <Text style={styles.pressText}>Continuar</Text>
      </Pressable>
      <View style={styles.signin}>
        <Text style={styles.signinText}>Já tem uma conta? </Text>
        <Text style={styles.signinLink} onPress={() => router.push("/screens/SignIn")}>Login</Text>
      </View>
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
  signin: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signinText: {
    color: '#fff',
  },
  signinLink: {
    color: '#FF6A00',
  },
});

export default SignUp;
