import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "blue",
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="connection"
                options={{
                    title: "Connection",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={28} name="wifi" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="controller"
                options={{
                    title: "Controller",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={28} name="tablet" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
