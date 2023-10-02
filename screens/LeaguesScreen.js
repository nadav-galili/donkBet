import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, SafeAreaView, ImageBackground } from "react-native";
import { Button, Text } from "react-native-paper";

import ShareIcon from "./common/Share";
import { useNavigation } from "@react-navigation/native";
import userService from "../services/userService";
import leagueService from "../services/leagueService";
import PageHeader from "../components/PageHeader";
import UserAvatar from "../components/UserAvatar";
import LeagueAvatar from "../components/LeagueAvatar";
import AppButton from "../components/AppButton";
import AppLogo from "../components/AppLogo";
import { SERVER_URL } from "../config";
import { colors } from "../colors";

const LeagueScreen = () => {
    const [user, setUser] = useState(null);
    const [leagues, setLeagues] = useState(null);
    const [leaguePlayers, setLeaguePlayers] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            // This code will be executed when the screen comes into focus
            fetchUser();
        });

        // Return a cleanup function to remove the event listener
        return unsubscribe;
    }, [navigation]);

    const fetchUser = async () => {
        const userData = await userService.getUserDetails();
        setUser(userData.data.user);
        if (userData.data.user?.id) {
            const { data } = await leagueService.getMyLeagues(userData.data.user.id);

            setLeagues(data?.user[0]?.userLeagues);
            setLeaguePlayers(data.leaguePlayers);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require("../assets/blue_chip2.png")} style={styles.container}>
                <ScrollView style={styles.overlay}>
                    <View style={styles.avatar}>{user?.nickName && <UserAvatar avatarSource={user.image} />}</View>
                    <View style={styles.logoContainer}>
                        <AppLogo />
                    </View>
                    <View style={styles.joinButtons}>
                        <AppButton
                            mode="outlined"
                            textColor={colors.Accent}
                            onPress={() => navigation.navigate("LeaguesRegistration", { user })}
                            icon="chart-bar"
                            color={colors.white}
                            width="40%"
                            text="+Create A League"
                       />
                            <AppButton
                            mode="outlined"
                            textColor={colors.Accent}
                            onPress={() => navigation.navigate("JoinLeagues", { user })}
                            icon="chart-bar"
                            color={colors.LightGreen}
                            width="40%"
                            text="Join A League"
                       />
                    </View>
                    <View style={styles.headerContainer}>
                        <PageHeader text="My Leagues" color={colors.white} />
                    </View>
                    {Array.isArray(leagues) && leagues.length < 1 && (
                        <View style={styles.noLeagues}>
                            <Text style={styles.noLeagues}>No leagues yet...</Text>
                            <Text style={styles.noLeagues}>join Or create a lague</Text>
                        </View>
                    )}
                    <View style={styles.leaguesContainer}>
                        {leagues?.map((league) => (
                            <View key={league.id} style={styles.leagueContainer}>
                                <Text style={styles.leagueName}>{league.league.league_name}</Text>
                                <Text>
                                    {" "}
                                    <Text style={{ fontWeight: "bold" }}>League Number: </Text>
                                    {league.league.league_number}
                                </Text>
                                <View style={styles.share}>
                                    <ShareIcon
                                        message={`You've been invited to Poker Donkey League ${league.league.league_name}:https://${SERVER_URL}{/league/${league.league.league_number}`}
                                    />
                                    <Text style={{ fontSize: 10, textAlignVertical: "center", paddingHorizontal: 7 }}>
                                        Invite friends to this league
                                    </Text>
                                </View>
                                <LeagueAvatar avatarSource={league.league?.league_image} />
                                <Text>
                                    {" "}
                                    <Text style={{ fontWeight: "bold" }}>League Manager: </Text>
                                    {league.league?.leagueAdmin?.nickName}
                                </Text>
                                <Text style={{ fontWeight: "bold", marginTop: 10 }}>Players:</Text>
                                <View style={styles.playersContainer}>
                                    {leaguePlayers?.map((player) => (
                                        <View key={player.id}>
                                            <UserAvatar avatarSource={player.User.image} />
                                            <Text key={player.id} style={styles.singlePlayer}>
                                                {player.User.nickName}
                                            </Text>
                                        </View>
                                    ))}
                                </View>

                                <AppButton
                                    icon="chart-bar"
                                    color={colors.primary}
                                    width="70%"
                                    text="League Statistics"
                                    onPress={() => console.log("league stats clicked")}
                                />
                                <AppButton
                                    color={colors.LightGreen}
                                    textColor={colors.Accent}
                                    width="70%"
                                    text="Start A New Game"
                                    onPress={() =>
                                        navigation.navigate("SelectPlayers", {
                                            user,
                                            leagues,
                                            leaguePlayers,
                                        })
                                    }
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
    button1: {
        backgroundColor: colors.primary,
        width: "40%",
    },
    button2: {
        backgroundColor: colors.LightGreen,
        width: "40%",
    },

    container: {
        flex: 1,

    },
    headerContainer: {
        alignItems: "center",
        marginTop: 20,
    },
    joinButtons: {
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "row",
    },

    leaguesContainer: {
        alignItems: "center",
        marginTop: 20,
    },
    leagueContainer: {
        width: "95%",
        backgroundColor: colors.white,
        borderRadius: 20,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
        borderColor: colors.MediumBlue,
        borderWidth: 2,
    },
    leagueName: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.MediumBlue,
        textTransform: "capitalize",
        textDecorationLine: "underline",
    },
    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
    },

    noLeagues: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        color: colors.white,
        fontSize: 20,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity as desired
    },
    playersContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
        marginTop: 10,
        maxWidth: "90%",
    },
    singlePlayer: {
        textAlign: "center",
        fontSize: 12,
        marginTop: 5, // add some margin to the top
    },
    share: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
    },
});

export default LeagueScreen;
