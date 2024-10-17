import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import Header from '../../components/header';

export default function Home() {
    const playlists = [
        { id: 1, title: 'Top Hits', image: 'https://via.placeholder.com/150' },
        { id: 2, title: 'Chill Vibes', image: 'https://via.placeholder.com/150' },
        { id: 3, title: 'Daily Mix', image: 'https://via.placeholder.com/150' },
    ];

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView>
                <Text style={styles.playlistTitle}>Playlists</Text>
                {playlists.map(playlist => (
                    <View key={playlist.id} style={styles.playlistCard}>
                        <Image source={{ uri: playlist.image }} style={styles.playlistImage} />
                        <Text style={styles.playlistText}>{playlist.title}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
    },
    header: {
        padding: 20,
        backgroundColor: '#d44600',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    playlistTitle: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 10,
    },
    playlistCard: {
        backgroundColor: '#282828',
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
        alignItems: 'center',
    },
    playlistImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    playlistText: {
        color: '#fff',
        marginTop: 5,
    },
});