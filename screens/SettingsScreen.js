import React from "react";
import { StyleSheet, View, TextInput, Image, Text, SafeAreaView, ImageBackground, Platform } from "react-native";

const SettingsScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>settings Screen</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default SettingsScreen;
