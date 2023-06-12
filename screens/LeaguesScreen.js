import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, SafeAreaView, Platform } from "react-native";
import { Button, Text } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";
import userService from "../services/userService";
import leagueService from "../services/leagueService";
import PageHeader from "../components/PageHeader";
import UserAvatar from "../components/UserAvatar";
import LeagueAvatar from "../components/LeagueAvatar";
import AppButton from "../components/AppButton";
import { colors } from "../colors";

const LeagueScreen = () => {
    const [user, setUser] = useState(null);
    const [leagues, setLeagues] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            // This code will be executed when the screen comes into focus
            fetchUser();
            // fetchLeagues();
        });

        // Return a cleanup function to remove the event listener
        return unsubscribe;
    }, [navigation]);

    const fetchUser = async () => {
        const userData = await userService.getUserDetails();
        console.log("🚀 ~ file: LeaguesScreen.js:32 ~ fetchUser ~ userData:", userData.data.user);
        setUser(userData.data.user);
        if (userData.data.user) {
            const { data } = await leagueService.getMyLeagues(userData.data.user.id);
            setLeagues(data?.user[0]?.userLeagues);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            {/* <ImageBackground source={require("../assets/background.jpg")} style={styles.container}> */}
            <ScrollView>
                <View style={styles.avatar}>{user?.nickName && <UserAvatar avatarSource={user.image} />}</View>
                <View style={styles.joinButtons}>
                    <Button
                        icon="plus-circle"
                        mode="text"
                        textColor={colors.Accent}
                        onPress={() => navigation.navigate("LeaguesRegistration", { user })}
                    >
                        Create New League
                    </Button>
                    <Button
                        icon="account-multiple-plus"
                        mode="text"
                        textColor={colors.Complementary}
                        onPress={() => console.log("Pressed")}
                    >
                        Join A League
                    </Button>
                </View>
                <View style={styles.headerContainer}>
                    <PageHeader text="My Leagues" color={colors.purple} />
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
                            <Text>League Number {league.league.league_number}</Text>
                            <LeagueAvatar avatarSource={league.league.league_image} />
                            <Text>League Manager: {league.league.leagueAdmin.nickName}</Text>
                            <Text>Players:</Text>
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
            {/* </ImageBackground> */}
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
        backgroundColor: colors.white,
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
    noLeagues: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
});

export default LeagueScreen;
