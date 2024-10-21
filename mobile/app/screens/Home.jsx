import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Card from '../../components/card';
import Header from '../../components/header';

const Home = () => {
  const playlists = [
    { id: '1', title: 'Funk de cria' },
    { id: '2', title: 'Música clássica' },
    { id: '3', title: 'Sertanejo de corno' },
    { id: '4', title: 'Pop Gay' },
    { id: '5', title: 'Rock muito metal' },
  ];

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        style={styles.list}
        data={playlists}
        renderItem={({ item }) => (
          <View style={styles.content}> 
            <Card title={item.title} />
          </View>
        )}
        keyExtractor={(item) => item.id}
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
    marginBottom: 20
  },
  content: {
    alignSelf: 'center',
  },
});

export default Home;
