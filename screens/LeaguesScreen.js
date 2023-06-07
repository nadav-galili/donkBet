import React, { useEffect } from "react";
import { StyleSheet, View, TextInput, Image, Text, SafeAreaView, ImageBackground, Platform } from "react-native";
import userService from "../services/userService";
import leagueService from "../services/leagueService";
import PageHeader from "../components/PageHeader";
import { colors } from "../colors";

const LeagueScreen = ({ navigation }) => {
    useEffect(() => {
        leagueService.getMyLeagues().then((res) => {
            console.log("🚀 ~ file: LeagueScreen.js:80 ~ leagueService.getLeagues ~ res", res.data);
        });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require("../assets/vibrant.webp")} style={styles.container}>
                <View style={styles.headerContainer}>
                    <PageHeader text="My Leagues" color={colors.Background} />
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        // flex: 1,
    },
    headerContainer: {
        marginTop: Platform.OS === "android" ? 55 : 0,
        alignItems: "center",
        // flex: 1,
        // justifyContent: "flex-start",
        // height: "33%",
    },
});

export default LeagueScreen;
