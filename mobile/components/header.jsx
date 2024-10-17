import { View, Text, StyleSheet, Image } from 'react-native';

export default function Header() {
    <View style={styles.header}>
        <Image style={styles.img} source={require('../assets/logo.png')} />
        <Text style={styles.title}>Sonar</Text>
    </View>
}

const styles = StyleSheet.create({
    header: {
        flex: 1
    },
    img: {
        width: 80,
        height: 80,
    },
    title: {
        fontWeight: '600'
    }
})