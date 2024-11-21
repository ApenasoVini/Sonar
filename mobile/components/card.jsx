import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const Card = (props) => {
  return (
    <TouchableOpacity onPress={() => alert('Oi')} style={styles.card}>
      <ImageBackground style={styles.img} source={{ uri: props.bg }}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.title}>{props.genre}</Text>
        <Text style={styles.title}>{props.author}</Text>
        {props.musics}
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    marginVertical: 10,
    width: 250,
    height: 250,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  img: {
    flex: 1
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Card;
