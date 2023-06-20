import React from "react";
import { ImageBackground, View, StyleSheet, FlatList, Text, SafeAreaView, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { colors } from "../../colors";
import AppLogo from "../../components/AppLogo";
import UserAvatar from "../../components/UserAvatar";
import GameInfo from "./GameInfo";
const NewGame = () => {
    const route = useRoute();

    const { user, game, leagues, leaguePlayers, GameDetails } = route.params;
    console.log("🚀 ~ file: NewGameScreen.js:22 ~ GameDetails:", GameDetails);

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require("../../assets/pokerChips4.png")} style={styles.container} blurRadius={1}>
                <FlatList
                    data={GameDetails}
                    keyExtractor={(item) => item.id.toString()}
                    ListHeaderComponent={
                        <>
                            <View style={styles.avatar}>
                                {user?.nickName && <UserAvatar avatarSource={user.image} />}
                            </View>
                            <View style={styles.logoContainer}>
                                <AppLogo />
                            </View>
                            <GameInfo gameId={game.id} createdAt={game.created_at} updatedAt={game.updated_at} />
                        </>
                    }
                    renderItem={({ item }) => (
                        <View style={styles.gameInfoContainer}>
                            <Text style={styles.gameInfoText}>xcxcxcxc{item.nickName}</Text>
                        </View>
                    )}
                />
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
        backgroundColor: colors.white,
    },

    gameInfo: {
        alignItems: "center",
        justifyContent: "center",
    },
    gameInfoContainer: {
        alignItems: "center",
        backgroundColor: colors.white,
        justifyContent: "center",
        margin: 10,
        padding: 10,
    },
    gameInfoText: {
        color: colors.darkPurple,
        fontSize: 20,
        fontWeight: "bold",
    },

    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
});

export default NewGame;
