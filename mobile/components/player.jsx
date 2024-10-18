import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Player = ({ track }) => {
  return (
    <View style={styles.player}>
      <Text style={styles.title}>{track}</Text>
      <Button title="Play" onPress={() => { }} color="#FF6A00" />
    </View>
  );
};

const styles = StyleSheet.create({
  player: {
    padding: 20,
    backgroundColor: '#222',
    borderRadius: 10,
    marginVertical: 20,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Player;
