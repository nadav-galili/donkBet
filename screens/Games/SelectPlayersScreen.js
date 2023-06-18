import React, { useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, ScrollView, ImageBackground } from "react-native";
import { useRoute } from "@react-navigation/native";
import UserAvatar from "../../components/UserAvatar";
import AppLogo from "../../components/AppLogo";
import PageHeader from "../../components/PageHeader";
import { colors } from "../../colors";
import PlayerCard from "./PlayerSelectCard";
import { Button } from "react-native-paper";

const SelectPlayersScreen = () => {
    const route = useRoute();

    const { user, league, leaguePlayers } = route.params;
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
                        <Text>Select at least 3 players to play</Text>
                        <Button
                            mode="contained"
                            textColor={colors.white}
                            onPress={() => console.log("aaa", selected)}
                            style={styles.button}
                            labelStyle={{ fontSize: 11 }}
                            disabled={selected.length <= 2}
                        >
                            <Text>Continue To Game</Text>
                        </Button>
                    </View>
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        {leaguePlayers?.map((player) => (
                            <View key={player.id} style={styles.playerCardContainer}>
                                <PlayerCard
                                    player={player}
                                    selected={selected.includes(player.id)}
                                    onSelect={handlePlayerSelection}
                                />
                            </View>
                        ))}
                    </ScrollView>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 200,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderColor: colors.Accent,
        borderWidth: 2,
        marginVertical: 20,
    },
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
    contentContainer: {
        paddingVertical: 20,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    playerCardContainer: {
        width: "50%",
        paddingHorizontal: 10,
        marginBottom: 20,
    },
});

export default SelectPlayersScreen;
