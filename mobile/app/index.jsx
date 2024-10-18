import { SafeAreaView, StyleSheet, Image } from 'react-native';
import { useEffect } from 'react';
import { router } from 'expo-router';

export default function App() {
    useEffect(() => {
        setTimeout(() => {
            router.push("/screens/Homee");
        }, 2000);
    });

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.img} source={require('../assets/logo.png')} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7C2900',
    },
    img: {
        width: 80,
        height: 80,
    },
});
