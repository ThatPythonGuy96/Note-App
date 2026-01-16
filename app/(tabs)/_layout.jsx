import { Tabs } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

const TabsLayout = () => {
    return (
        <Tabs screenOptions={{ 
            tabBarActiveTintColor: '#01B170', 
            tabBarInactiveTintColor: '#F5F5F5', 
            headerShown: false,
            tabBarStyle: {
                backgroundColor: 'black',
                elevation: 0,
                borderTopWidth: 0
            },
            headerStyle: {backgroundColor: 'black'}
        }}>
            <Tabs.Screen 
                name="index" 
                options={{
                    title: "Home",
                    tabBarIcon: ({color}) => (
                        <FontAwesome5 name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen 
                name="Task" 
                options={{
                    title: "Task",
                    tabBarIcon: ({color}) => (
                        <FontAwesome5 name="tasks" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    )
}

export default TabsLayout