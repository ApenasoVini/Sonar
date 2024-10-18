import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SignUp = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <TextInput placeholder="First Name" style={styles.input} placeholderTextColor="#ccc" />
      <TextInput placeholder="Last Name" style={styles.input} placeholderTextColor="#ccc" />
      <TextInput placeholder="Email" style={styles.input} placeholderTextColor="#ccc" />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} placeholderTextColor="#ccc" />
      <Button title="Sign Up" onPress={() => navigation.replace('Home')} color="#FF6A00" />
      <View style={styles.signin}>
        <Text style={styles.signinText}>Already have an account? </Text>
        <Text style={styles.signinLink} onPress={() => navigation.navigate('SignIn')}>Sign In</Text>
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
