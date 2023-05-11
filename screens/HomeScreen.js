import React from "react";
import { StyleSheet, View, Text, ImageBackground, SafeAreaView, Image } from "react-native";
import AppButton from "../components/AppButton";
import { colors } from "../colors";

export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require("../assets/background.jpg")} style={styles.container}>
                <Text style={styles.header}>Welcome To </Text>
                <Image source={require("../assets/donklogo.webp")} style={styles.image} />
                <Text style={styles.header}>Donk Bet App</Text>
                <View>
                    <AppButton
                        color={colors.green}
                        width="90%"
                        text="Log in"
                        onPress={() => navigation.navigate("Login")}
                    />
                    <AppButton
                        color={colors.blue}
                        width="90%"
                        text="Create an account"
                        onPress={() => navigation.navigate("SignUp")}
                    />
                    <AppButton color={colors.primary} width="90%" text="Take A Tour" onPress={console.log("about")} />
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    header: {
        fontSize: 30,
        color: "#fff",
        textAlign: "center",
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        alignSelf: "center",
        borderRadius: 100,
    },
});
