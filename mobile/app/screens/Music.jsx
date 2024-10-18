import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Player from '../../components/player';

const Music = () => {
  const { song } = 'A';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nome</Text>
      <Player track={song} />
      <Button title="Add to Playlist" onPress={() => {}} color="#FF6A00" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1A1A1A',
  },
  title: {
    fontSize: 24,
    color: '#FF6A00',
    marginBottom: 20,
  },
});

export default Music;
