import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text, Image, Pressable, Alert } from "react-native";
import axios from 'axios';
import { AppContext } from "../../scripts/AppContext";

export default function Profile() {
  const { user } = useContext(AppContext);
  const [data, setData] = useState({});

  const getUserInfo = async () => {
    try {
      const res = await axios.get(`http://10.0.2.2:8000/user/${user.id}`);
      setData(res.data.data); 
      console.log(res.data.data); 
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        {
          data.profileImage ? (
            <Image source={{ uri: data.profileImage }} style={styles.profileImage} />
          ) : (
            <Image source={require('../../assets/profile.png')} style={styles.profileImage} />
          )
        }
      </View>
      <View style={styles.userInfoContainer}>
        <Text style={styles.username}>{data.username}</Text>
        <Text style={styles.email}>{data.email}</Text>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.description}>{data.description}</Text>
        <Text style={styles.birthDate}>{data.dateBirth}</Text> 
      </View>
      <Pressable style={styles.editButton} onPress={() => Alert.alert('Foi')}>
        <Text style={styles.editButtonText}>Editar conta</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#000",
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    marginTop: 50,
    marginBottom: 30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#FF6A00',
  },
  userInfoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  username: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    color: '#FFF',
    fontSize: 18,
    marginBottom: 5,
  },
  name: {
    color: '#FFF',
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    color: '#FFF',
    fontSize: 18,
    marginBottom: 5,
  },
  birthDate: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 20,
  },
  editButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF6A00',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
