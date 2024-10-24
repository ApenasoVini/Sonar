import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import { router } from 'expo-router'

const Payments = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [nome, setNome] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete seus dados</Text>
      <View style={styles.content}>
        <Text style={styles.textOne}>R$ 10,99/mês</Text>
        <Text style={styles.textTwo}>Tenha acesso ao melhor App de música!</Text>
      </View>
      <View style={styles.card}>
        <TextInput
          style={styles.input1}
          placeholder="Nome Completo"
          onChangeText={setNome}
          keyboardType='default'
        />
        <TextInput
          style={styles.input2}
          placeholder="Nº do cartão"
          onChangeText={setCardNumber}
          keyboardType='number-pad'
          maxLength={15}
        />
        <View style={styles.span}>
          <TextInput
            style={styles.input3}
            placeholder="Código"
            onChangeText={setCardNumber}
            keyboardType='number-pad'
            maxLength={3}
          />
          <TextInput
            style={styles.input4}
            placeholder="Validade"
            onChangeText={setCardNumber}
            keyboardType='number-pad'
            maxLength={3}
          />
        </View>
      </View>
      <Pressable style={styles.press} onPress={() => router.push("/screens/Home")}>
        <Text style={styles.pressText}>Concluir</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  title: {
    fontSize: 24,
    color: '#FF6A00',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    backgroundColor: '#000',
    borderRadius: 20,
    justifyContent: 'center',
    padding: 15,
    marginVertical: 10
  },
  textOne: {
    color: '#FFF'
  },
  textTwo: {
    color: '#CCC'
  },
  input1: {
    borderWidth: 1,
    borderColor: '#252729',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#2A2A2A',
  },
  input2: {
    borderWidth: 1,
    borderColor: '#252729',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#2A2A2A',
  },
  span: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input3: {
    borderWidth: 1,
    borderColor: '#252729',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#2A2A2A',
  },
  input4: {
    borderWidth: 1,
    borderColor: '#252729',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#2A2A2A',
  },
  card: {
    backgroundColor: '#454444',
    borderRadius: 7,
    padding: 10,
  },
  press: {
    backgroundColor: '#FF6A00',
    width: '100%',
    paddingVertical: 12
  },
  pressText: {
    color: '#FFF',
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase'
  }
});

export default Payments;
