import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { router } from 'expo-router';

const Artist = (props) => {
    return (
        <TouchableOpacity onPress={() => router.push({ pathname: '/screens/User/[id]', params: { id: props.id } })} style={styles.artist}>
            <Image style={styles.img} source={{ uri: props.bg }}>
            </Image>
            <View>
                <Text style={styles.txt}>{props.username}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    artist: {
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
    txt: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: '800',
    },
});

export default Artist;
