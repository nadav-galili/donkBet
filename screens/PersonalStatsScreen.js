import React from "react";
import { StyleSheet, View, TextInput, Image, Text, SafeAreaView, ImageBackground, Platform } from "react-native";

const PersonalStats = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>personal stats Screen</Text>
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

export default PersonalStats;
