import React from "react";
import Navigation from "./Navigation";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";

export default function App() {
    return (
        <NavigationContainer>
            <Navigation />
            <Toast />
        </NavigationContainer>
    );
}
