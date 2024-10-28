import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import axios from 'axios';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dateBirth, setDateBirth] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await axios.post('http://localhost:3000/api/auth/signup', {
        firstName,
        lastName,
        email,
        dateBirth,
        password,
      });
      router.push("/screens/SignIn");
    } catch (error) {
      alert(error.response ? error.response.data.message : "Erro ao cadastrar.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crie sua conta</Text>
      <TextInput value={firstName} onChangeText={setFirstName} placeholder="Nome" style={styles.input} placeholderTextColor="#ccc" />
      <TextInput value={lastName} onChangeText={setLastName} placeholder="Sobrenome" style={styles.input} placeholderTextColor="#ccc" />
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" style={styles.input} placeholderTextColor="#ccc" />
      <TextInput value={dateBirth} onChangeText={setDateBirth} placeholder="Data de Nascimento" style={styles.input} placeholderTextColor="#ccc" />
      <TextInput value={password} onChangeText={setPassword} placeholder="Senha" secureTextEntry style={styles.input} placeholderTextColor="#ccc" />
      <Pressable style={styles.press} onPress={handleSignUp}>
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
