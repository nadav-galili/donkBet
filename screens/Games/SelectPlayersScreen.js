import React, { useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, ScrollView, ImageBackground } from "react-native";
import { useRoute } from "@react-navigation/native";
import UserAvatar from "../../components/UserAvatar";
import AppLogo from "../../components/AppLogo";
import PageHeader from "../../components/PageHeader";
import { colors } from "../../colors";
import PlayerCard from "./PlayerSelectCard";

const SelectPlayersScreen = () => {
    const route = useRoute();
    const user = route.params.user;
    const league = route.params.league;
    const leaguePlayers = route.params.leaguePlayers;
    const [selected, setSelected] = useState([]);
    console.log("🚀 ~ file: SelectPlayersScreen.js:16 ~ SelectPlayersScreen ~ selected:", selected);

    const handlePlayerSelection = (playerId) => {
        setSelected((prevSelected) => {
            if (prevSelected.includes(playerId)) {
                // If the ID is already selected, remove it from the array
                return prevSelected.filter((id) => id !== playerId);
            } else {
                // If the ID is not selected, add it to the array
                return [...prevSelected, playerId];
            }
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require("../../assets/spaceChips3.png")} style={styles.container} blurRadius={0}>
                <ScrollView>
                    <View style={styles.avatar}>{user?.nickName && <UserAvatar avatarSource={user.image} />}</View>
                    <View style={styles.logoContainer}>
                        <AppLogo />
                    </View>
                    <View style={styles.headerContainer}>
                        <PageHeader text="Select Players" color={colors.darkPurple} />
                    </View>
                    {leaguePlayers?.map((player) => {
                        return (
                            <View key={player.id} style={styles.playerCardContainer}>
                                <PlayerCard
                                    player={player}
                                    selected={selected.includes(player.id)}
                                    onSelect={handlePlayerSelection}
                                />
                            </View>
                        );
                    })}
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatar: {
        alignItems: "flex-end",
        marginTop: 30,
        marginRight: 20,
    },
    headerContainer: {
        alignItems: "center",
        backgroundColor: colors.white,
    },
    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    playerCardContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        flexDirection: "row",
    },
});

export default SelectPlayersScreen;
