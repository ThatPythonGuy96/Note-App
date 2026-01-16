import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const TaskItem = ({name, reminder, remind, task}) => {
	return (
		<Link href={`/task/${task}`} asChild>
			<TouchableOpacity style={{ padding: 16, backgroundColor: 'gray', borderRadius: 8, marginVertical: 8 }}>
				<Text style={styles.text}>{name}</Text>
				<View>
					{reminder && <Text style={styles.remind}>{remind}</Text> }
				</View>
			</TouchableOpacity>
		</Link>
	)
}

export default TaskItem

const styles = StyleSheet.create({
  text: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        paddingTop: 10
    },
    remind: {
        color: 'lightgray',
        fontSize: 14,
        marginTop: 4,
    }
})