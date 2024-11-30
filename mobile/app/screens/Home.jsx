import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Card from '../../components/card';
import Header from '../../components/header';
import axios from 'axios';

const Home = () => {
  const [albuns, setAlbuns] = useState([]);

  useEffect(() => {
    const fetchAlbuns = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:8000/album');
        setAlbuns(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar álbuns:', error);
      }
    };

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
              name={item.name}
              bg={item.albumImage}
              genre={item.genre}
              author={item.user.username}
              id={item.id}
            />
          </View>
        )}
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
    alignSelf: 'flex-start',
  },
});

export default Home;
