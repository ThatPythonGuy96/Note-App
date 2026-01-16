import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import { useRouter } from 'expo-router'

const Task = () => {
    const insets = useSafeAreaInsets()
    const router = useRouter()
    const { task } = useLocalSearchParams()

    return (
        <View>
        <Text>{task}</Text>
        </View>
    )
}

export default Task

const styles = StyleSheet.create({})