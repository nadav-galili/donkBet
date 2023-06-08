import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LeaguesScreen from "./screens/LeaguesScreen";
import PersonalStatsScreen from "./screens/PersonalStatsScreen";
import SettingsScreen from "./screens/SettingsScreen";
// import any other screens you want in the bottom navigation

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen name="LeagueTab" component={LeaguesScreen} options={{ headerShown: false }} />
            <BottomTab.Screen
                name="PersonalStatsTab"
                component={PersonalStatsScreen}
                options={{ headerShown: false }}
            />
            <BottomTab.Screen name="SettingsTab" component={SettingsScreen} options={{ headerShown: false }} />
            {/* Add a BottomTab.Screen for each of the other screens you want in the bottom navigation */}
        </BottomTab.Navigator>
    );
}

export default BottomTabNavigator;
