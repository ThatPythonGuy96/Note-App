import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const NoteItem = ({ title, text, id, created }) => {
    return (
        <Link href={`${id}`} asChild>
            <TouchableOpacity>
                <View style={{ padding: 16, backgroundColor: 'gray', borderRadius: 8, marginVertical: 8 }}>
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
                    <Text style={styles.text} numberOfLines={3} ellipsizeMode="tail">{text}</Text>
                    <Text style={styles.created}>{created}</Text>
                </View>
            </TouchableOpacity>
        </Link>
        
    )
}
export default NoteItem

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    text: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        paddingTop: 10
    },
    created: {
        color: 'lightgray',
        fontSize: 14,
        marginTop: 4,
    }
})