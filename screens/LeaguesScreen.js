import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Text, SafeAreaView, ImageBackground, Platform } from "react-native";
import userService from "../services/userService";
import leagueService from "../services/leagueService";
import PageHeader from "../components/PageHeader";
import UserAvatar from "../components/UserAvatar";
import TeamAvatar from "../components/teamAvatar";
import AppButton from "../components/AppButton";
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
                <ScrollView>
                    <View style={styles.avatar}>{user?.nickName && <UserAvatar avatarSource={user.image} />}</View>
                    <View style={styles.joinButtons}>
                        <Text>Create A New League</Text>
                        <Text>Join Your Friends League</Text>
                    </View>
                    <View style={styles.headerContainer}>
                        <PageHeader text="My Leagues" color={"#3AD29F"} />
                    </View>
                    {!leagues && <Text>No leagues yet...</Text>}
                    <View style={styles.leaguesContainer}>
                        {leagues?.map((league) => (
                            <View key={league.id} style={styles.leagueContainer}>
                                <Text style={styles.leagueName}>{league.League.league_name}</Text>
                                <Text>League Number</Text>
                                <TeamAvatar avatarSource={league.League.league_image} />
                                <Text>League Manager</Text>
                                <Text>Players</Text>
                                <AppButton
                                    color={colors.Accent}
                                    width="70%"
                                    text="League Statistics"
                                    onPress={() => console.log("league stats clicked")}
                                />
                                <AppButton
                                    color={colors.Complementary}
                                    width="70%"
                                    text="Start A New Game"
                                    onPress={() => console.log("start a new game clicked")}
                                />
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    avatar: {
        alignItems: "flex-end",
        marginTop: 50,
        marginRight: 20,
    },

    container: {
        flex: 1,
    },
    headerContainer: {
        marginTop: Platform.OS === "android" ? 15 : 0,
        alignItems: "center",
    },
    joinButtons: {
        alignItems: "center",
    },

    leaguesContainer: {
        alignItems: "center",
        marginTop: 20,
    },
    leagueContainer: {
        width: "90%",
        backgroundColor: colors.white,
        borderRadius: 20,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    leagueName: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.MediumBlue,
        textTransform: "capitalize",
        textDecorationLine: "underline",
    },
});

export default LeagueScreen;
