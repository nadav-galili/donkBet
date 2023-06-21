import React from "react";
import { ImageBackground, View, StyleSheet, FlatList, Text, SafeAreaView, TextInput } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-paper";
import { colors } from "../../colors";
import AppLogo from "../../components/AppLogo";
import UserAvatar from "../../components/UserAvatar";
import GameInfo from "./GameInfo";
import PlayerAvatar from "../../components/PlayerAvatar";

const NewGame = () => {
    const route = useRoute();

    const { user, game, leagues, leaguePlayers, GameDetails, usersGames } = route.params;
    console.log("🚀 ~ flllllllllllllllllllllllllllllGames:", usersGames);

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require("../../assets/pokerChips4.png")} style={styles.container} blurRadius={1}>
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
                                <Text style={{ color: "white", fontSize: 12 }}>+/- Buy-In</Text>
                                <Text style={styles.headersLongText}>Total Buy-Ins</Text>
                                <Text style={styles.headersLongText}>Cash In Hand</Text>
                                <Text style={styles.headersText}>Profit</Text>
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
                                onPress={() => console.log(`cash in ${item?.User?.nickName}`)}
                            />
                            <FontAwesome
                                name="times-circle"
                                size={22}
                                style={{ width: "5%" }}
                                color={"red"}
                                onPress={() => console.log(`cancel buy-in for ${item?.User?.nickName}`)}
                            />
                            <Text style={styles.cashOut}>cash out</Text>

                            <Text style={styles.gameInfoText}>{item?.buy_ins_amount}</Text>

                            <TextInput style={styles.cashInHand}>{item?.cash_in_hand}</TextInput>
                            <Text style={styles.gameInfoText}>{item?.profit}</Text>
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
        fontSize: 10,

        fontWeight: "bold",
        width: "15%",
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    gameHeaders: {
        flexDirection: "row-reverse",
        justifyContent: "space-around",
        marginTop: 20,
        marginBottom: 10,

        padding: 10,
        backgroundColor: colors.white,
    },
    gameInfoContainer: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        marginHorizontal: 5,
        paddingVertical: 10,
        paddingLeft: 10,
        alignItems: "center",
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.darkPurple,
    },
    gameInfoText: {
        // color: colors.darkPurple,
        fontSize: 9,
        fontWeight: "bold",
        width: "10%",
    },
    headersText: {
        color: colors.blue,
        fontSize: 12,
        marginRight: 10,
        fontWeight: "bold",
    },
    headersLongText: {
        color: colors.blue,
        fontSize: 10,
        width: "15%",
        fontWeight: "bold",
    },

    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
});

export default NewGame;
