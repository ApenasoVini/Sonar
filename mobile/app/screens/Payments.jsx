import React from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';

const Payments = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Complete seus dados para a assinatura</Text>

      <View style={styles.add}>
        <Text style={styles.textOne}>R$ 10,99/mês</Text>
        <Text style={styles.textTwo}>Aproveite todos os recursos do melhor App de música!</Text>
      </View>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          placeholderTextColor='#FFF'
          keyboardType='default'
        />
        <TextInput
          style={styles.input}
          placeholder="Número do Cartão"
          placeholderTextColor='#FFF'
          keyboardType='number-pad'
          maxLength={16}
        />

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.inputSmall]}
            placeholder="Código"
            placeholderTextColor='#FFF'
            keyboardType='number-pad'
            maxLength={3}
          />
          <TextInput
            style={[styles.input, styles.inputSmall]}
            placeholder="Validade (MM/AA)"
            placeholderTextColor='#FFF'
            keyboardType='number-pad'
            maxLength={5}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="CPF"
          placeholderTextColor='#FFF'
          keyboardType='number-pad'
          maxLength={11}
        />

        <TextInput
          style={styles.input}
          placeholder="Endereço de Cobrança"
          placeholderTextColor='#FFF'
          keyboardType='default'
        />
      </View>

      <Pressable style={styles.press} onPress={() => router.push("/screens/Home")}>
        <Text style={styles.pressText}>Concluir Pagamento</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1A1A1A',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    color: '#FF6A00',
    marginBottom: 20,
    textAlign: 'center',
  },
  add: {
    backgroundColor: '#222',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  textOne: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 5,
  },
  textTwo: {
    color: '#AAA',
    fontSize: 14,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#444',
    marginVertical: 8,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#2A2A2A',
    color: '#FFF',
  },
  inputSmall: {
    flex: 1,
    marginHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  press: {
    backgroundColor: '#FF6A00',
    paddingVertical: 14,
    borderRadius: 5,
    marginTop: 20,
  },
  pressText: {
    color: '#FFF',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

export default Payments;