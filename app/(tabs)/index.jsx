import { StyleSheet, Text, SafeAreaView, ScrollView, Alert, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import NoteItem from '../../components/NoteItem'
import api from '../../api'
import { useState, useEffect } from 'react'
import { useRouter } from 'expo-router'
import { RefreshControl } from 'react-native'

const index = () => {
    const insets = useSafeAreaInsets()
    const [notes, setNotes] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const router = useRouter()

    useEffect(() => {
        getNotes()
    }, [])

    const getNotes = async() => {
        setRefreshing(true);
        await api.get('/api/notes/')
        .then(res => {
            setNotes(res.data)
        })       
        .catch(error => {
            console.log(error.message)
            Alert.alert('Error', 'Failed to fetch notes. Please try again later.')
        })
        .finally(() => {
            setRefreshing(false);
        });
    };

    function handlePress() {
        api.post('/api/notes/', 
            {title: '', body: ''}, 
            { headers: { 'Content-Type': 'application/json' }}
        )
        .then(res => {
            router.push(`/${res.data.id}`)
        })       
        .catch(error => {
            Alert.alert('Error', 'Failed to create note. Please try again later.')
        })
    }

    return (
        <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <Text style={styles.title}>Note App</Text>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={getNotes} />
                }
            >
                {notes.map(note => (
                    <NoteItem key={note.id} title={note.title} text={note.body} id={note.id} created={note.created} />
                ))}
            </ScrollView>
            <TouchableOpacity
                style={styles.fab}
                onPress={handlePress}
                activeOpacity={0.7}
            >
                <Text style={styles.fabIcon}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )

}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3d3c3cff',
        paddingHorizontal: 16
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16
    },
    fab: {
        position: 'absolute',
        right: 24,
        bottom: 32,
        backgroundColor: '#4CAF50',
        width: 70,
        height: 70,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    fabIcon: {
        color: 'white',
        fontSize: 60,
        fontWeight: 'bold',
        marginBottom: 2,
    }
})