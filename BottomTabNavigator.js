import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import LeaguesScreen from "./screens/LeaguesScreen";
import PersonalStatsScreen from "./screens/PersonalStatsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LeaguesRegistrationScreen from "./screens/Leagues/LeaguesRegistrationScreen";

// import any other screens you want in the bottom navigation

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

// function LeaguesRegistrationStack() {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen
//                 name="LeaguesRegistration"
//                 component={LeaguesRegistrationScreen}
//                 options={{ headerShown: false }}
//             />
//             {/* Add any additional screens for the LeaguesRegistrationStack */}
//         </Stack.Navigator>
//     );
// }
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
