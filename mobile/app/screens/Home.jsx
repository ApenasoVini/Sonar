import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Card from '../../components/card';
import Header from '../../components/header';

const Home = ({ navigation }) => {
  const playlists = [
    { id: '1', title: 'Top Hits' },
    { id: '2', title: 'Chill Vibes' },
    { id: '3', title: 'Workout Mix' },
  ];

  return (
    <View style={styles.container}>
      <Header title="Home" />
      <FlatList
        data={playlists}
        renderItem={({ item }) => (
          <Card title={item.title} onPress={() => navigation.navigate('Playlist', { playlistId: item.id })} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
});

export default Home;
