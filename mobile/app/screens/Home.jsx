import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Card from '../../components/card';
import Header from '../../components/header';
import axios from 'axios';
import Artist from '../../components/artist';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [albunsResponse, usersResponse] = await Promise.all([
          axios.get('http://10.0.2.2:8000/album'),
          axios.get('http://10.0.2.2:8000/user'),
        ]);

        const albuns = albunsResponse.data.data.map((item) => ({
          ...item,
          type: 'album',
        }));
        const users = usersResponse.data.data.map((item) => ({
          ...item,
          type: 'user',
        }));

        setData([...albuns, ...users]);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    if (item.type === 'album') {
      return (
        <View style={styles.content}>
          <Card
            name={item.name}
            bg={item.albumImage}
            genre={item.genre}
            author={item.user.username}
            id={item.id}
          />
        </View>
      );
    }
    if (item.type === 'user') {
      return (
        <View style={styles.content}>
          <Artist
            username={item.username}
            bg={item.profileImage}
            id={item.id}
          />
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        style={styles.list}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.type}-${item.id}-${index}`}
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
