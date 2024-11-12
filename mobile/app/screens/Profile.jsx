import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text, Image, Pressable, Alert } from "react-native";
import axios from 'axios';
import { AppContext } from "../../scripts/AppContext";

export default function Profile() {
  const { user } = useContext(AppContext);
  const [data, setData] = useState({});

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await axios.get(`http://10.0.2.2:8000/user/${user.id}`);
        setData(res.data.data);
        console.log(res.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.ImageContainer}>
        {
          data.profileImage ? (
            <Image source={{ uri: data.profileImage }} style={styles.profileImage} />
          ) : (
            <Image source={require('../../assets/profile.png')} style={styles.profileImage} />
          )
        }
      </View>
      <View style={styles.InfoContainer}>
        <Text style={styles.info}>{data.username}</Text>
        <Text style={styles.info}>{data.email}</Text>
        <Text style={styles.info}>{data.name}</Text>
        <Text style={styles.info}>{data.description}</Text>
        <Text style={styles.info}>{data.dateBirth}</Text>
      </View>
      <Pressable style={styles.press} onPress={() => Alert.alert('Foi')}>
        <Text style={styles.pressText}>Editar conta</Text>
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
