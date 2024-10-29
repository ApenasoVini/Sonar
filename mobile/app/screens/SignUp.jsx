import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, Image, Pressable, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import axios from 'axios';

const SignUp = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const handleSignUp = async () => {
    if (!email || !name || !password || !username || !passwordConfirm) return;

    if (passwordConfirm !== password) {
      return Alert.alert("As senhas devem ser iguais");
    }

    let formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('description', description);
    formData.append('dateBirth', dateBirth);
    if (profilePic) {
      formData.append('profilePic', {
        uri: profilePic.uri,
        type: profilePic.mimeType,
        name: profilePic.fileName,
      });
    }

    try {
      await axios.post(
        "http://localhost:8000/user/register",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      Alert.alert("Usuário criado com sucesso.");
      router.push("/screens/Payments");
    }
    catch (e) {
      console.log(e);
      Alert.alert("Um erro ocorreu! Tente novamente.");
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setProfilePic(result.assets[0]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Crie sua conta</Text>
      <TextInput value={name} onChangeText={setName} placeholder="Nome completo" style={styles.input} placeholderTextColor="#ccc" />
      <TextInput value={username} onChangeText={setUsername} placeholder="Nome de usuário" style={styles.input} placeholderTextColor="#ccc" />
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" style={styles.input} placeholderTextColor="#ccc" />
      <TextInput value={dateBirth} onChangeText={setDateBirth} placeholder="Data de Nascimento" style={styles.input} placeholderTextColor="#ccc" />
      <TextInput value={description} onChangeText={setDescription} placeholder="Descrição" style={styles.input} placeholderTextColor="#ccc" />
      <TextInput value={password} onChangeText={setPassword} placeholder="Senha" secureTextEntry style={styles.input} placeholderTextColor="#ccc" />
      <TextInput value={passwordConfirm} onChangeText={setPasswordConfirm} placeholder="Confirme sua senha" secureTextEntry style={styles.input} placeholderTextColor="#ccc" />
      {profilePic !== null ? (
        <Pressable onPress={pickImage} style={styles.buttonImg}>
          <Image source={{ uri: profilePic.uri }} style={styles.image} />
        </Pressable>
      )
        : (
          <Pressable onPress={pickImage} style={styles.buttonImg}>
            <Text>Adicionar Foto</Text>
          </Pressable>
        )}

      <Pressable style={styles.press} onPress={handleSignUp}>
        <Text style={styles.pressText}>Cadastrar</Text>
      </Pressable>
      <View style={styles.signin}>
        <Text style={styles.signinText}>Já tem uma conta? </Text>
        <Text style={styles.signinLink} onPress={() => router.push("/screens/SignIn")}>Login</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  title: {
    fontSize: 32,
    color: '#FF6A00',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonImg: {
    alignItems: 'center',
    marginVertical: 10
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
  image: {
    width: 200,
    height: 200,
    borderRadius: 100
  },
  signinLink: {
    color: '#FF6A00',
  },
});

export default SignUp;