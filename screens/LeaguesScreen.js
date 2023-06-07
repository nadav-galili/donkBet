import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, Image, Text, SafeAreaView, ImageBackground, Platform } from "react-native";
import userService from "../services/userService";
import leagueService from "../services/leagueService";
import PageHeader from "../components/PageHeader";
import { colors } from "../colors";

const LeagueScreen = ({ navigation }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const userData = await userService.getUserDetails();
        console.log("🚀 ~ file: LeaguesScreen.js:16 ~ fetchUser ~ userData:", userData?.data?.user);
        setUser(userData.data.user);
    };
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require("../assets/vibrant.webp")} style={styles.container}>
                <View style={styles.headerContainer}>
                    <PageHeader text="My Leagues" color={colors.Background} />
                    {user?.nickName && <Text>{user.nickName}</Text>}
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
