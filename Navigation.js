import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import SignUpScreen from "./screens/SignUpScreen";
import LoginScreen from "./screens/LoginScreen";
import LeaguesRegistrationScreen from "./screens/Leagues/LeaguesRegistrationScreen";
import JoinLeaguesScreen from "./screens/Leagues/JoinLeaguesScreen";
import SelectPlayersScreen from "./screens/Games/SelectPlayersScreen";
import NewGame from "./screens/Games/NewGameScreen";

import BottomTabNavigator from "./BottomTabNavigator";
const Stack = createStackNavigator();

export default function Navigation() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen
                name="LeaguesRegistration"
                component={LeaguesRegistrationScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="JoinLeagues" component={JoinLeaguesScreen} />
            <Stack.Screen name="MyLeagues" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="SelectPlayers" component={SelectPlayersScreen} />
            <Stack.Screen name="NewGame" component={NewGame} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
