import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Card from '../../components/card';
import Header from '../../components/header';

const Artist = () => {
  const albums = [
    { id: '1', title: 'Album One' },
    { id: '2', title: 'Album Two' },
    { id: '3', title: 'Album Three' },
  ];

  return (
    <View style={styles.container}>
      <Header title="Artist" />
      <FlatList
        data={albums}
        renderItem={({ item }) => (
          <Card title={item.title} onPress={() => { }} />
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

export default Artist;
