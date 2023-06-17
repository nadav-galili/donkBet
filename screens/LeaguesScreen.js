import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, SafeAreaView, ImageBackground } from "react-native";
import { Button, Text } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";
import userService from "../services/userService";
import leagueService from "../services/leagueService";
import PageHeader from "../components/PageHeader";
import UserAvatar from "../components/UserAvatar";
import LeagueAvatar from "../components/LeagueAvatar";
import AppButton from "../components/AppButton";
import AppLogo from "../components/AppLogo";
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
            <ImageBackground source={require("../assets/spaceChips1.png")} style={styles.container} blurRadius={0}>
                <ScrollView>
                    <View style={styles.avatar}>{user?.nickName && <UserAvatar avatarSource={user.image} />}</View>
                    <View style={styles.logoContainer}>
                        <AppLogo />
                    </View>
                    <View style={styles.joinButtons}>
                        <Button
                            mode="outlined"
                            textColor={colors.Accent}
                            onPress={() => navigation.navigate("LeaguesRegistration", { user })}
                            style={styles.button2}
                            labelStyle={{ fontSize: 9 }}
                        >
                            Create New League
                        </Button>
                        <Button
                            mode="contained"
                            textColor={colors.white}
                            onPress={() => navigation.navigate("JoinLeagues", { user })}
                            style={styles.button1}
                            labelStyle={{ fontSize: 9 }}
                        >
                            Join A League
                        </Button>
                    </View>
                    <View style={styles.headerContainer}>
                        <PageHeader text="My Leagues" color={colors.lightPink} />
                    </View>
                    {Array.isArray(leagues) && leagues.length < 1 && (
                        <View style={styles.noLeagues}>
                            <Text variant="titleLarge">No leagues yet...</Text>
                            <Text variant="titleLarge">join Or create a lague</Text>
                        </View>
                    )}
                    <View style={styles.leaguesContainer}>
                        {leagues?.map((league) => (
                            <View key={league.id} style={styles.leagueContainer}>
                                <Text style={styles.leagueName}>{league.league.league_name}</Text>
                                <Text>League Number: {league.league.league_number}</Text>
                                <LeagueAvatar avatarSource={league.league?.league_image} />
                                <Text>League Manager: {league.league?.leagueAdmin?.nickName}</Text>
                                <Text>Players:</Text>
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
    button1: {
        backgroundColor: colors.primary,
    },
    button2: {
        backgroundColor: colors.LightGreen,
    },

    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    headerContainer: {
        alignItems: "center",
        borderBottomColor: colors.white,
        borderBottomWidth: 3,
        backgroundColor: colors.white,
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
    },
    playersContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
    },
    singlePlayer: {
        textAlign: "center",
        fontSize: 12,
        marginTop: 5, // add some margin to the top
        // marginHorizontal: 15, // add some margin to the right and left
    },
});

export default LeagueScreen;
