import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Button mode="contained" onPress={() => navigation.navigate("SignUp")}>
                Create an account
            </Button>
            <Button mode="outlined" onPress={() => navigation.navigate("Login")}>
                Log in
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
