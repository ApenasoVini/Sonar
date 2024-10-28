import React from 'react';
import { View, Text, Pressable, Image, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function Profile() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/profile.png')} style={styles.icon} />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.username}>@johndoe</Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Informações</Text>
        <Text style={styles.info}>Email: john.doe@example.com</Text>
        <Text style={styles.info}>Telefone: +55 (11) 99999-9999</Text>
        <Text style={styles.info}>Endereço: São Paulo, Brasil</Text>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.button} onPress={() => router.push('/edit-profile')}>
          <FontAwesome name="edit" size={16} color="#fff" />
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.logoutButton]} onPress={() => { }}>
          <FontAwesome name="sign-out" size={16} color="#fff" />
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1A1A1A',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  icon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6A00',
  },
  username: {
    fontSize: 16,
    color: '#CCCCCC',
  },
  infoSection: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#FF6A00',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6A00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  logoutButton: {
    backgroundColor: '#FF3B3B',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
});
