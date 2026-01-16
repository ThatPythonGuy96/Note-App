import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { RefreshControl } from 'react-native'
import { useEffect, useState } from 'react'
import TaskItem from '../../components/TaskItem'
import api from '../../api'

const Task = () => {
    const insets = useSafeAreaInsets()
    const [refreshing, setRefreshing] = useState(false)
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        getTasks()
    }, [])

    const getTasks = async() => {
        setRefreshing(true);
        await api.get('/api/tasks/')
        .then(res => {
            setTasks(res.data)
            setRefreshing(false)
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
        api.post('/api/tasks/', 
            {name: '', reminder: false}, 
            { headers: { 'Content-Type': 'application/json' }}
        )
        .then(res => {
            router.push(`task/${res.data.id}`)
            console.log(res.data)
        })       
        .catch(error => {
            Alert.alert('Error', 'Failed to create task. Please try again later.')
        })   
    }

    return (
        <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <Text style={styles.title}>Task</Text>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={getTasks} />
                }
            >
                {tasks.map(task => (
                    <TaskItem key={task.id} name={task.name} reminder={task.reminder} remind={task.remind} task={task.id}/>
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

export default Task

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