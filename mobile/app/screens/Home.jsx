import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Card from '../../components/card';
import Header from '../../components/header';
import axios from 'axios';

const Home = () => {
  const [albuns, setAlbuns] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    //   const fetchUserData = async () => {
    //     try {
    //       const userResponse = await axios.get(
    //         "http://10.0.2.2:8000/user/"
    //       );
    //       setUser(userResponse.data);
    //     } catch (error) {
    //       console.error('Erro ao buscar dados do usuário:', error);
    //     }
    //   };

    const fetchAlbuns = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:8000/album');
        // if (user) {
        //   const filteredAlbuns = response.data.filter(
        //     (item) => item.userId !== user.id && item.userType === 'artist'
        //   );
        setAlbuns(response.data.data);
        console.log(response.data.data[0]?.music.name);
        // }
      } catch (error) {
        console.error('Erro ao buscar álbuns:', error);
      }
    };

    // fetchUserData();
    fetchAlbuns();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        style={styles.list}
        data={albuns}
        renderItem={({ item }) => (
          <View style={styles.content}>
            <Card
              title={item.name}
              bg={item.albumImage}
              genre={item.genre}
              author={item.user.username}
              musics={item.musics.name}
            />
          </View>
        )}
        // keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  list: {
    flex: 1,
    marginBottom: 20,
  },
  content: {
    alignSelf: 'center',
  },
});

export default Home;
