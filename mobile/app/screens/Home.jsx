import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Card from '../../components/card';
import Header from '../../components/header';

const Home = ({ navigation }) => {
  const playlists = [
    { id: '1', title: 'Funk de cria' },
    { id: '2', title: 'Música clássica' },
    { id: '3', title: 'Sertanejo de corno' },
    { id: '4', title: 'Pop Gay' },
    { id: '5', title: 'Rock muito metal' },
  ];

  return (
    <View style={styles.container}>
      <Header title="Home" />
      <View style={styles.list}>
        <FlatList
          data={playlists}
          renderItem={({ item }) => (
            <Card title={item.title} onPress={() => navigation.navigate('Playlist', { playlistId: item.id })} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  list: {
    alignItems: 'center',
    width: '100%',
  }
});

export default Home;
