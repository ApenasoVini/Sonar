import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function Auth() {
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#7C2900', '#d44600']}
                style={styles.background}>
                <View style={styles.form}>
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
                    <TouchableOpacity style={styles.button}>
                        <Link href='/home' style={styles.buttonText}>Entrar</Link>
                    </TouchableOpacity>

                    <Link href='/auth/cadastro' style={styles.link}>Ainda não tem conta? Cadastre-se</Link>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 35
    },
    form: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.75,
        shadowRadius: 4,
        width: '100%',
        elevation: 10
    },
    input: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: 10,
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    button: {
        backgroundColor: '#d44600',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold'
    },
    link: {
        marginTop: 10,
        textAlign: 'center',
        fontWeight: '700',
        textDecorationLine: 'underline'
    }
});
