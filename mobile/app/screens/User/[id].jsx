import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text, Image, Pressable, Alert, TextInput } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { AppContext } from "../../../scripts/AppContext";

export default function () {
  const { user, token } = useContext(AppContext);
  const [data, setData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

    const getUserInfo = async () => {
      try {
        const res = await axios.get(`http://10.0.2.2:8000/user/${user.id}`);
        setData(res.data.data);
      } catch (e) {
        console.log(e);
      }
    };

    useEffect(() => {
      getUserInfo()
  }, []);

  const handleEditProfile = async () => {
    if (newPassword && newPassword !== confirmPassword) {
      Alert.alert("As senhas não coincidem.");
      return;
    }
  
    try {
      const formData = new FormData();
  
      if (data.profileImage) {
        const file = {
          uri: data.profileImage,
          type: 'image/jpeg',
          name: 'profileImage.jpg',
        };
        formData.append('profileImage', file);
      }
  
      formData.append('name', data.name);
      formData.append('username', data.username);
      formData.append('description', data.description);
      formData.append('dateBirth', data.dateBirth);
  
      if (newPassword) {
        formData.append('password', newPassword);
      }
  
      const res = await axios.patch(
        `http://10.0.2.2:8000/user/${user.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, 
          },
        }
      );
  
      setData(res.data); 
      setIsEditing(false);
      Alert.alert('Perfil atualizado com sucesso');
      await getUserInfo()
      setNewPassword('');
      setConfirmPassword('');
    } catch (e) {
      console.log(e);
      Alert.alert('Erro ao atualizar perfil');
    }
  };
  
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permissão para acessar a galeria é necessária!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setData({ ...data, profileImage: result.uri });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.ImageContainer}>
        <Pressable onPress={pickImage}>
          {data.profileImage ? (
            <Image source={{ uri: data.profileImage }} style={styles.profileImage} />
          ) : (
            <Image source={require('../../../assets/profile.png')} style={styles.profileImage} />
          )}
        </Pressable>
      </View>
      <View style={styles.InfoContainer}>
        {isEditing ? (
          <>
            <TextInput
              style={styles.input}
              value={data.username}
              onChangeText={(text) => setData({ ...data, username: text })}
            />
            <TextInput
              style={styles.input}
              value={data.name}
              onChangeText={(text) => setData({ ...data, name: text })}
            />
            <TextInput
              style={styles.input}
              value={data.description}
              onChangeText={(text) => setData({ ...data, description: text })}
            />
            <TextInput
              style={styles.input}
              value={data.dateBirth}
              onChangeText={(text) => setData({ ...data, dateBirth: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Nova Senha"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirme a Nova Senha"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </>
        ) : (
          <>
            <Text style={styles.info}>{data.username}</Text>
            <Text style={styles.info}>{data.email}</Text>
            <Text style={styles.info}>{data.name}</Text>
            <Text style={styles.info}>{data.description}</Text>
            <Text style={styles.info}>{data.dateBirth}</Text>
          </>
        )}
      </View>
      <Pressable style={styles.press} onPress={() => {
        if (isEditing) {
          handleEditProfile();
        } else {
          setIsEditing(true);
        }
      }}>
        <Text style={styles.pressText}>{isEditing ? 'Salvar' : 'Editar conta'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
    alignItems: 'center'
  },
  ImageContainer: {
    marginTop: 50,
    marginBottom: 30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  InfoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  info: {
    color: '#FFF',
    fontSize: 28,
    marginVertical: 3,
  },
  input: {
    color: '#FFF',
    fontSize: 18,
    backgroundColor: '#333',
    padding: 10,
    marginVertical: 3,
    width: '100%',
    borderRadius: 8,
  },
  press: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF6A00',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
