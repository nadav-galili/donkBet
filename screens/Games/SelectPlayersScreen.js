import React, { useState } from "react";
import { View, Dimensions, StyleSheet, Text, SafeAreaView, ScrollView, ImageBackground } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import UserAvatar from "../../components/UserAvatar";
import AppLogo from "../../components/AppLogo";
import PageHeader from "../../components/PageHeader";
import { colors } from "../../colors";
import PlayerCard from "./PlayerSelectCard";
import { Button } from "react-native-paper";
import gameService from "../../services/gameService";

const SelectPlayersScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { user, leagues, leaguePlayers } = route.params;
    const [selected, setSelected] = useState([]);

    const openNewGame = async () => {
        const { data } = await gameService.newGame(selected, leagues, leaguePlayers);
        const { GameDetails, game } = data;
        navigation.navigate("NewGame", { game, user, leagues, leaguePlayers, selected, GameDetails });
    };

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
            <ImageBackground source={require("../../assets/purple_chip_white.png")} style={styles.container} blurRadius={0}>
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
                            onPress={() => openNewGame()}
                            style={styles.button}
                            labelStyle={{ fontSize: 11 }}
                            disabled={selected.length <= 1}
                        >
                            <Text>Continue To Game</Text>
                        </Button>
                    </View>
                    {/* render playerCard */}
                    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                        {leaguePlayers.map((player) => (
                            <View style={styles.playerCardContainer} key={player?.User?.id}>
                                <PlayerCard
                                    player={player}
                                    selected={selected.includes(player?.User?.id)}
                                    onSelect={handlePlayerSelection}
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
        marginVertical: 20,
        alignItems: "center", 
        width: "33.3%",
    },
    wrapper: {
        height: 400,
    },

});

export default SelectPlayersScreen;
