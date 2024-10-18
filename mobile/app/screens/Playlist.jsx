import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Card from '../../components/card';
import Header from '../../components/header';

const Playlist = () => {
  const songs = [
    { id: '1', title: 'Song One' },
    { id: '2', title: 'Song Two' },
    { id: '3', title: 'Song Three' },
  ];

  return (
    <View style={styles.container}>
      <Header title="Playlist" />
      <FlatList
        data={songs}
        renderItem={({ item }) => (
          <Card title={item.title} onPress={() => {}} />
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

export default Playlist;
