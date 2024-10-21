import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.iconContainer}>
        <Image source={require('../assets/home.png')} style={styles.icon} />
      </View>
      <View style={styles.searchContainer}>
        <Image source={require('../assets/search.png')} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder='O que você quer ouvir?'
          keyboardType='default'
          placeholderTextColor="#888"
        />
      </View>
      <View style={styles.iconContainer}>
        <Image source={require('../assets/profile.png')} style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    backgroundColor: '#1F1F1F',
    borderRadius: 100,
    padding: 7
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#888'
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 15,
  },
  searchIcon: {
    width: 24,
    height: 24,
    tintColor: '#888',
    marginHorizontal: 5
  },
  input: {
    flex: 1,
    paddingVertical: 5,
    fontSize: 16,
    color: '#fff',
  },
});

export default Header;
