import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack"
import Search from "../pages/search";
import Create from "../pages/create";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppRoutes = () => {

    function TabBarIcon({ name }) {
        return <Ionicons size={30} color="#000" name={name} />;
    }

    return (
        <Tab.Navigator tabBarOptions={{ activeBackgroundColor: "#FF990D" }}>
            <Tab.Screen options={{ tabBarIcon: () => <TabBarIcon name="person-add-sharp" />, tabBarLabel: () => { return null }, }} name="Create" component={Create} />
            <Tab.Screen options={{ tabBarIcon: () => <TabBarIcon name="md-list-sharp" />, tabBarLabel: () => { return null } }} name="Search" component={Search} />
        </Tab.Navigator>
    )
}

export default AppRoutes;