import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Auth() {

    return (
        <SafeAreaView style={styles.container}>
            <View style={form}>
                <TextInput
                    placeholder='Nome completo'
                    style={styles.input}
                />
                <TextInput
                    keyboardType='email-address'
                    placeholder='Email'
                    style={styles.input}
                />
                <TextInput
                    placeholder='Senha'
                    secureTextEntry={true}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.button} onPress={register}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#001f35'
    },
    form: {
        backgroundColor: '#FFF',
        padding: 6
    },
    input: {
        width: '100%',
        height: 10
    }
})