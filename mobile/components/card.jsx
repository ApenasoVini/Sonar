import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const Card = ({ title }) => {
  return (
    <TouchableOpacity onPress={() => alert('Oi')} style={styles.card}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FF6A00',
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
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Card;
