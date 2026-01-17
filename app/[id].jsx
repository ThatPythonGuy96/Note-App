import { StyleSheet, TextInput, ScrollView, View, Text, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import { useState, useEffect } from 'react'
import api from '../api'
import { useRouter } from 'expo-router'

const id = () => {
    const insets = useSafeAreaInsets()
    const router = useRouter()
    const { id } = useLocalSearchParams()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    
    useEffect(() => {
        getNote()
    }, [])

    const getNote = () => {
        api.get(`/api/note/${id}/`)
        .then(res => {
            setTitle(res.data.title)
            setContent(res.data.body)
        })       
        .catch(error => {
            Alert.alert('Error', 'Failed to fetch notes. Please try again later.')
        })
    };

    function handleSave () {
        api.put(`/api/note/${id}/`, 
            { title, body: content }, 
            { headers: { 'Content-Type': 'application/json' }}
        )
        .then(() => {
            router.replace('/')
        })       
        .catch(error => {
            console.error('Error updating note:', error)
        })

    }
    
    function handleDelete () {
        api.delete(`/api/note/${id}/`)
        .then(() => {
            router.replace('/')
        })       
        .catch(error => {
            console.error('Error deleting note:', error)
        })
    }

    return (
        <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <TextInput 
                    style={styles.input} 
                    placeholder="Enter note title" 
                    placeholderTextColor="black" 
                    multiline
                    value={title} 
                    onChangeText={setTitle} 
                />
                <TextInput 
                    style={[styles.input, { flex: 1, height: 690, textAlignVertical: 'top', marginTop: 10, fontSize: 16 }]} 
                    placeholder="Enter note content" 
                    multiline 
                    placeholderTextColor="black" 
                    value={content} 
                    onChangeText={setContent} 
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default id

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 12,
        height: 50
    },
    container: {
        flex: 1,
        backgroundColor: '#363e55ff',
        paddingHorizontal: 10,
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
})