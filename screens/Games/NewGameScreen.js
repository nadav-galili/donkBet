import React, { useEffect, useState } from "react";
import { ImageBackground, View, StyleSheet, FlatList, Text, SafeAreaView } from "react-native";
import { Button } from "react-native-paper";
import { useRoute, useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { colors } from "../../colors";
import AppLogo from "../../components/AppLogo";
import UserAvatar from "../../components/UserAvatar";
import GameInfo from "./GameInfo";
import PlayerAvatar from "../../components/PlayerAvatar";
import gameService from "../../services/gameService";

const NewGame = () => {
    const route = useRoute();
    const [gamesData, setGamesData] = useState(usersGames);

    //get my userGames
    // const useEffect = () => {

    const { user, game, leagues, leaguePlayers, GameDetails, usersGames } = route.params;
    console.log("🚀 ~ flllllllllllllllllllllllllllllGames:", usersGames);

    const addBuyInToPlayer = async (playerId, gameId, buyInAmount, leagueId) => {
        try {
            const { data } = await gameService.addBuyInToPlayer(playerId, gameId, buyInAmount, leagueId);
            console.log("🚀 ~ file: NewGameScreen.js ~ line 55 ~ addBuyInToPlayer ~ data", data);
        } catch (error) {
            console.log("🚀 ~ file: NewGameScreen.js ~ line 57 ~ addBuyInToPlayer ~ error", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require("../../assets/spaceChips3.png")} style={styles.container}>
                <FlatList
                    data={usersGames}
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
                            <View style={styles.gameHeaders}>
                                <Text style={styles.headersText}>Player</Text>
                                <Text style={styles.headersText}>+/- Buy-In</Text>

                                <Text style={styles.headersText}>Total Buy-Ins</Text>
                                <Text style={styles.headersLongText}>Cash Out Player</Text>
                                {/* <Text style={styles.headersText}>Profit</Text> */}
                            </View>
                        </>
                    }
                    renderItem={({ item }) => (
                        <View style={styles.gameInfoContainer}>
                            <PlayerAvatar avatarSource={item?.User?.image} playerName={item?.User?.nickName} />
                            <FontAwesome
                                name="money"
                                size={25}
                                style={{ marginLeft: 10 }}
                                color={colors.green}
                                // onPress={() => console.log(`cash in ${item?.User?.nickName}`)}
                                onPress={() => addBuyInToPlayer(item?.User?.id, game.id, 100, item?.league_id)}
                            />
                            <FontAwesome
                                name="times-circle"
                                size={22}
                                style={{ width: "5%" }}
                                color={"red"}
                                onPress={() => console.log(`cancel buy-in for ${item?.User?.nickName}`)}
                            />

                            <Text style={styles.gameInfoText}>{item?.buy_ins_amount}</Text>
                            {/* <Text style={styles.cas/>hOut}>cash out</Text> */}
                            <Button
                                mode="contained"
                                labelStyle={{ fontSize: 6.2, color: colors.white }}
                                onPress={() => console.log(`cash out for ${item?.User?.nickName}`)}
                                style={styles.cashOut}
                            >
                                cash out
                            </Button>

                            {/* <TextInput style={styles.cashInHand} keyboardType="numeric">
                                {item?.cash_in_hand}
                            </TextInput> */}
                            {/* <Text style={styles.gameInfoText}>{item?.profit}</Text> */}
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
    cashInHand: {
        color: colors.black,
        fontSize: 13,
        fontWeight: "bold",
        width: "15%",
        borderColor: colors.darkPurple,
        borderWidth: 1,
        borderRadius: 5,
        textAlign: "center",
    },
    cashOut: {
        color: colors.darkPurple,

        // fontWeight: "bold",
        width: "22%",
    },
    container: {
        flex: 1,
        // backgroundColor: colors.white,
    },
    gameHeaders: {
        flexDirection: "row-reverse",
        justifyContent: "space-around",
        marginTop: 20,
        paddingVertical: 10,
        // marginBottom: 10,

        // padding: 10,
        backgroundColor: colors.Accent,
    },
    gameInfoContainer: {
        flexDirection: "row-reverse",
        justifyContent: "space-around",
        // marginHorizontal: 5,
        paddingVertical: 10,
        // paddingLeft: 10,
        alignItems: "center",
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.darkPurple,
    },
    gameInfoText: {
        fontSize: 10,
        fontWeight: "bold",
        // width: "15%",
    },
    headersText: {
        color: colors.white,
        fontSize: 12,
        // marginRight: 10,
        fontWeight: "bold",
    },
    headersLongText: {
        color: colors.white,
        fontSize: 7,
        width: "15%",
        fontWeight: "bold",
    },

    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
});

export default NewGame;
