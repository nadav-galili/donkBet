import React, { useEffect, useState } from "react";
import { ImageBackground, View, StyleSheet, FlatList, Text, SafeAreaView, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import PromptModal from "../common/PromptModal";
import CashOutModal from "../common/CashOutModal";
import { useRoute } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { colors } from "../../colors";
import AppLogo from "../../components/AppLogo";
import UserAvatar from "../../components/UserAvatar";
import GameInfo from "./GameInfo";
import PlayerAvatar from "../../components/PlayerAvatar";
import BuyInsDetails from "./BuyInsDetails";
import gameService from "../../services/gameService";
import Toast from "react-native-toast-message";

const NewGame = () => {
    const route = useRoute();
    const [gamesData, setGamesData] = useState({});
    const [changedUserBuyIns, setchangedUserBuyIns] = useState(false);
    const [gameDetails, setGameDetails] = useState({});
    const [isPromptVisible, setIsPromptVisible] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [cashOuts, setCashOuts] = useState(null);
    console.log("🚀 ~ file: NewGameScreen.js:25 ~ NewGame ~ cashOuts:", cashOuts);
    const { user, game, leagues, leaguePlayers } = route.params;

    useEffect(() => {
        const getUserGames = async () => {
            try {
                const { data } = await gameService.getUserGamesByGameId(game.id);
                setGamesData(data);
                const { data: gameDetails } = await gameService.getGameDetails(game.id);
                // console.log("🚀 ~ file: NewGameScreen.js:27 ~ getUserGames ~ gameDetails:", gameDetails);
                setGameDetails(gameDetails);
            } catch (error) {
                console.log("🚀 ~ f/ile: NewGameScreen.js ~ line 31 ~ getUserGames ~ error", error);
            }
        };
        getUserGames();
    }, [changedUserBuyIns]);

    const addBuyInToPlayer = async (playerId, gameId, buyInAmount, leagueId, nickName) => {
        try {
            setIsPromptVisible(true);
            const { data } = await gameService.addBuyInToPlayer(playerId, gameId, buyInAmount, leagueId);
            setIsPromptVisible(false);
            setchangedUserBuyIns(!changedUserBuyIns);
            Toast.show({
                type: "success",
                position: "top",
                text1: `Buy-In of ${buyInAmount} added to ${nickName}`,
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
        } catch (error) {
            console.log("🚀 ~ file: NewGameScreen.js ~ line 57 ~ addBuyInToPlayer ~ error", error);
        }
    };
    const handleCashOut = async (cashOutAmount) => {
        await gameService.cashOutPlayer(cashOuts.User.id, game.id, cashOutAmount);
        setCashOuts(null);
        setIsPromptVisible(false);
    };
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require("../../assets/spaceChips3.png")} style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {gamesData?.userGames?.length > 0 ? (
                        <>
                            <FlatList
                                data={gamesData.userGames}
                                keyExtractor={(item) => item.id.toString()}
                                ListHeaderComponent={
                                    <>
                                        <View style={styles.avatar}>
                                            {user?.nickName && <UserAvatar avatarSource={user.image} />}
                                        </View>
                                        <View style={styles.logoContainer}>
                                            <AppLogo />
                                        </View>
                                        <GameInfo
                                            gameId={game.id}
                                            createdAt={game.created_at}
                                            updatedAt={game.updated_at}
                                        />
                                        <View style={styles.gameHeaders}>
                                            <Text style={styles.headersText}>Player</Text>
                                            <Text style={styles.headersText}>+/- Buy-In</Text>

                                            <Text style={styles.headersText}>Total Buy-Ins</Text>
                                            <Text style={styles.headersLongText}>Cash Out Player</Text>
                                        </View>
                                    </>
                                }
                                renderItem={({ item }) => (
                                    <View style={styles.gameInfoContainer}>
                                        <PlayerAvatar
                                            avatarSource={item?.User?.image}
                                            playerName={item?.User?.nickName}
                                        />
                                        <View style={styles.iconContainer}>
                                            <FontAwesome
                                                name="money"
                                                size={25}
                                                color={colors.green}
                                                onPress={() => {
                                                    setIsPromptVisible(true);
                                                    setSelectedPlayer(item);
                                                }}
                                            />
                                            <FontAwesome
                                                name="times-circle"
                                                size={22}
                                                color={"red"}
                                                onPress={() => console.log(`cancel buy-in for ${item?.User?.nickName}`)}
                                            />
                                        </View>

                                        <Text style={styles.gameInfoText}>{item?.buy_ins_amount}</Text>

                                        <Button
                                            mode="contained"
                                            labelStyle={{ fontSize: 9, color: colors.white }}
                                            onPress={() => {
                                                setIsPromptVisible(true);
                                                setCashOuts(item);
                                            }}
                                            style={styles.cashOut}
                                        >
                                            Cash Out
                                        </Button>
                                    </View>
                                )}
                            />
                            <BuyInsDetails gameDetails={gameDetails} />
                            {selectedPlayer && (
                                <PromptModal
                                    isVisible={isPromptVisible}
                                    onClose={(() => setSelectedPlayer(null), () => setIsPromptVisible(false))}
                                    imageUrl={selectedPlayer?.User?.image}
                                    headerText={`Add Buy-In to ${selectedPlayer?.User?.nickName}?`}
                                    buttonTexts={["Add 50", "Add 100", "Cancel"]}
                                    buttonColors={[colors.Complementary, colors.blue, "red"]}
                                    buttonActions={[
                                        () =>
                                            addBuyInToPlayer(
                                                selectedPlayer?.User?.id,
                                                game.id,
                                                50,
                                                selectedPlayer?.league_id,
                                                selectedPlayer?.User?.nickName
                                            ),
                                        () => {
                                            addBuyInToPlayer(
                                                selectedPlayer?.User?.id,
                                                game.id,
                                                100,
                                                selectedPlayer?.league_id,
                                                selectedPlayer?.User?.nickName
                                            );
                                        },
                                        () => {
                                            setSelectedPlayer(null);
                                            setIsPromptVisible(false);
                                        },
                                    ]}
                                />
                            )}
                            {cashOuts && (
                                <CashOutModal
                                    isVisible={isPromptVisible && cashOuts !== null}
                                    onClose={() => {
                                        setCashOuts(null);
                                        setIsPromptVisible(false);
                                    }}
                                    imageUrl={cashOuts?.User?.image}
                                    headerText={`Cash Out ${cashOuts?.User?.nickName}?`}
                                    totalBuyIns={cashOuts?.buy_ins_amount}
                                    buttonTexts={[`Cash ${cashOuts?.User?.nickName} out`, "Cancel"]}
                                    buttonColors={[colors.green, "red"]}
                                    onCashOut={(cashOutAmount) => handleCashOut(cashOutAmount)}
                                />
                            )}
                        </>
                    ) : (
                        <View>
                            <Text>No games</Text>
                        </View>
                    )}
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
        width: "22%",
    },
    container: {
        flex: 1,
        // paddingBottom: 20,
    },
    gameHeaders: {
        flexDirection: "row-reverse",
        justifyContent: "space-around",
        marginTop: 20,
        paddingVertical: 10,
        backgroundColor: colors.Accent,
    },
    gameInfoContainer: {
        flexDirection: "row-reverse",
        justifyContent: "space-around",
        paddingVertical: 5,
        alignItems: "center",
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.darkPurple,
    },
    gameInfoText: {
        fontSize: 13,
        fontWeight: "bold",
        width: "12%",
        textAlign: "center",
    },
    headersText: {
        color: colors.white,
        fontSize: 12,

        fontWeight: "bold",
    },
    headersLongText: {
        color: colors.white,
        fontSize: 11,
        alignSelf: "center",
        width: "15%",
        fontWeight: "bold",
    },

    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    iconContainer: {
        flexDirection: "row-reverse",
        justifyContent: "space-around",
        width: "20%",
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
});

export default NewGame;
