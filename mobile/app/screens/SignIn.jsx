import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import axios from 'axios';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      await axios.post('http://localhost:3000/api/auth/login', { email, password });
      router.push("/screens/Home");
    } catch (error) {
      alert(error.response ? error.response.data.message : "Erro ao fazer login.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem vindo de volta!</Text>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" style={styles.input} inputMode='email' placeholderTextColor="#ccc" />
      <TextInput value={password} onChangeText={setPassword} placeholder="Senha" secureTextEntry style={styles.input} placeholderTextColor="#ccc" />
      <Pressable style={styles.press} onPress={handleSignIn}>
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