import React, { useContext, useState } from 'react';
import { View, TextInput, Pressable, Text, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { router } from 'expo-router';
import { AppContext } from '../../scripts/AppContext';
import { jwtDecode } from 'jwt-decode'

const SignIn = () => {
  const { setToken, setUser } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (!email || !password) return;

    try {
      const res = await axios.post(
        "http://10.0.2.2:8000/auth/",
        { "email": email, "password": password }
      );
      setToken(res.data.token);
      const user = jwtDecode(res.data.token);
      setUser(user);
      router.push("/screens/Home");
    }
    catch (e) {
      Alert.alert("Um erro ocorreu, tente novamente!");
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
        placeholderTextColor="#ccc"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#ccc"
      />
      <Pressable style={styles.press} onPress={handleSignIn}>
        <Text style={styles.pressText}>Entrar</Text>
      </Pressable>
      <Text style={styles.signupText} onPress={() => router.push("/screens/SignUp")}>
        Não tem uma conta? Cadastre-se
      </Text>
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