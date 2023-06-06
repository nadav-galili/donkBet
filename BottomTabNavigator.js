import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LeaguesScreen from "./screens/LeaguesScreen";
// import any other screens you want in the bottom navigation

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen name="LeagueTab" component={LeaguesScreen} />
            {/* Add a BottomTab.Screen for each of the other screens you want in the bottom navigation */}
        </BottomTab.Navigator>
    );
}

export default BottomTabNavigator;
