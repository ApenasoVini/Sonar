import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SignIn = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <TextInput placeholder="Email" style={styles.input} placeholderTextColor="#ccc" />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} placeholderTextColor="#ccc" />
      <Button title="Sign In" onPress={() => navigation.replace('Home')} color="#FF6A00" />
      <View style={styles.signup}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <Text style={styles.signupLink} onPress={() => navigation.navigate('SignUp')}>Sign Up</Text>
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
