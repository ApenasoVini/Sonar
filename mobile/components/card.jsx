import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { router } from 'expo-router';

const Card = (props) => {
  return (
    <TouchableOpacity onPress={() => router.push({ pathname: '/screens/Album/[id]', params: { id: props.id } })} style={styles.card}>
      <Image style={styles.img} source={{ uri: props.bg }}>
      </Image>
      <View style={styles.info}>
        <View>
          <Text style={styles.txt1}>{props.name}</Text>
        </View>
        <View style={styles.author}>
          <View style={styles.line}>
            <Text style={styles.icon1}>𝅘𝅥𝅮</Text>
            <Text style={styles.txt2}>{props.genre}</Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.icon2}>•</Text>
            <Text style={styles.txt3}>{props.author}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  img: {
    width: 100,
    height: 100,
    marginRight: 15,
  },
  line: {
    flexDirection: 'row',
    display: 'flex',
  },
  info: {
    flexDirection: 'column',
    display: 'flex'
  },
  txt1: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '800',
  },
  author: {
    width: 'auto',
    flexDirection: 'column',
    display: 'flex',
  },
  icon1: {
    color: '#FFF',
    fontSize: 24,
    marginHorizontal: 5
  },
  txt2: {
    color: '#FFF',
    fontWeight: '600',
    marginRight: 15,
    fontSize: 24
  },
  icon2: {
    color: '#FFF',
    fontSize: 30,
    marginHorizontal: 5
  },
  txt3: {
    color: '#FFF',
    fontSize: 24,
    backgroundColor: '#FF6A00',
    fontWeight: '600',
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 15
  },
});

export default Card;
