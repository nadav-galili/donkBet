import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, Image, Text, SafeAreaView, ImageBackground, Platform } from "react-native";
import userService from "../services/userService";
import leagueService from "../services/leagueService";
import PageHeader from "../components/PageHeader";
import UserAvatar from "../components/UserAvatar";
import { colors } from "../colors";

const LeagueScreen = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [leagues, setLeagues] = useState(null);
    useEffect(() => {
        fetchUser();
        fetchLeagues();
    }, []);

    const fetchLeagues = async () => {
        if (!user) return;
        const { data } = await leagueService.getMyLeagues(user.id);
        console.log("🚀 ~ file: LeaguesScreen.js:18 ~ fetchLeagues ~ leagues:", data);
        setLeagues(data);
    };
    const fetchUser = async () => {
        const userData = await userService.getUserDetails();
        console.log("🚀 ~ file: LeaguesScreen.js:16 ~ fetchUser ~ userData:", userData?.data?.user);
        setUser(userData.data.user);
    };
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require("../assets/background.jpg")} style={styles.container}>
                <View style={styles.avatar}>
                    {user?.nickName && <UserAvatar avatarSource={user.image} style={styles.avatar} />}
                </View>
                <View style={styles.headerContainer}>
                    <PageHeader text="My Leagues" color={colors.Complementary} />
                </View>
                <View style={styles.leaguesContainer}>
                    {leagues?.map((league) => (
                        <View key={league.id} style={styles.leagueContainer}>
                            <Text style={styles.leagueName}>{league.League.league_name}</Text>
                            <Text style={styles.leagueName}>{league.League.league_image}</Text>
                        </View>
                    ))}
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    avatar: {
        position: "absolute",
        top: 50,
        right: 20,
    },

    container: {
        flex: 1,
    },
    headerContainer: {
        marginTop: Platform.OS === "android" ? 100 : 0,
        alignItems: "center",
    },
    leaguesContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    leagueContainer: {
        width: "90%",
        height: 100,
        backgroundColor: colors.Background,
        borderRadius: 20,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default LeagueScreen;
