import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

export default function () {
    const { id } = useLocalSearchParams();
    const [album, setAlbum] = useState(null);

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const response = await axios.get(`http://10.0.2.2:8000/album/${id}`);
                setAlbum(response.data.data);
            } catch (error) {
                console.error('Erro ao buscar detalhes do álbum:', error);
            }
        };

        fetchAlbum();
    }, [id]);

    if (!album) {
        return (
            <View style={styles.container}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#000000', '#232323']}
                style={styles.gradient}
            >
                <Image source={{ uri: album.albumImage }} style={styles.albumImage} />
            </LinearGradient>
            <Text style={styles.title}>{album.name}</Text>
            <Text style={styles.genre}>Gênero: {album.genre}</Text>
            <Text style={styles.author}>Criado por: {album.user.username}</Text>
            <FlatList
                data={album.musics}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text style={styles.song}>{item.name}</Text>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#1A1A1A',
    },
    gradient: {
        marginTop: 30,
        display: 'flex',
        alignItems: 'center'
    },
    albumImage: {
        width: 300,
        height: 300,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        color: '#FFF',
        fontWeight: 'bold',
    },
    genre: {
        fontSize: 18,
        color: '#CCC',
        marginVertical: 8,
    },
    author: {
        fontSize: 18,
        color: '#FFF',
        marginBottom: 16,
    },
    song: {
        fontSize: 16,
        color: '#FFF',
        marginBottom: 8,
    },
});
