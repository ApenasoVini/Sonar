import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext'; 

const Profile = () => {
  const { user } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      {user.profileImage ? (
        <Image source={{ uri: user.profileImage }} style={styles.image} />
      ) : (
        <Text style={styles.noImage}>Sem imagem de perfil</Text>
      )}
      <Text style={styles.text}>Nome: {user.name}</Text>
      <Text style={styles.text}>Username: {user.username}</Text>
      <Text style={styles.text}>Email: {user.email}</Text>
      <Text style={styles.text}>Data de Nascimento: {user.dateBirth}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  noImage: {
    color: '#FFF',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: '#FFF',
  },
});

export default Profile;
