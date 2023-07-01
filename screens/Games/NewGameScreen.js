import React, { useEffect, useState } from "react";
import { ImageBackground, View, StyleSheet, FlatList, Text, SafeAreaView, ScrollView } from "react-native";
import { Button, ActivityIndicator } from "react-native-paper";
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
import { useNavigation } from "@react-navigation/native";

const NewGame = () => {
    const route = useRoute();
    const [gamesData, setGamesData] = useState({});
    const [changedUserBuyIns, setchangedUserBuyIns] = useState(false);
    const [gameDetails, setGameDetails] = useState({});
    const [isPromptVisible, setIsPromptVisible] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [cashOuts, setCashOuts] = useState(null);
    const [cashedOutPlayers, setCashedOutPlayers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user, game, leagues, leaguePlayers } = route.params;
    const navigation = useNavigation();

    useEffect(() => {
        const getUserGames = async () => {
            try {
                const { data } = await gameService.getUserGamesByGameId(game.id);
                setGamesData(data);
                const { data: gameDetails } = await gameService.getGameDetails(game.id);
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
            setLoading(true);
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
            setLoading(false);
        } catch (error) {
            console.log("🚀 ~ file: NewGameScreen.js ~ line 57 ~ addBuyInToPlayer ~ error", error);
        }
    };
    const handleCashOut = async (cashOutAmount) => {
        if (!cashOutAmount || cashOutAmount < 0) {
            Toast.show({
                type: "error",
                position: "top",

                text1: `Please enter a valid amount`,
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
            return;
        }
        setLoading(true);
        await gameService.cashOutPlayer(cashOuts.User.id, game.id, cashOutAmount);
        setCashOuts(null);
        if (cashedOutPlayers.includes(cashOuts.User.id)) return;
        setCashedOutPlayers([...cashedOutPlayers, cashOuts.User.id]);
        setIsPromptVisible(false);
        setchangedUserBuyIns(!changedUserBuyIns);
        setLoading(false);
    };

    const endGame = (gameId) => async () => {
        try {
            await gameService.endGame(gameId);
            Toast.show({
                type: "success",
                position: "top",
                text1: `Game number ${gameId} ended successfully`,
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
            navigation.navigate("MyLeagues", { screen: "LeagueTab" });
        } catch (error) {
            console.log("🚀 ~ file: NewGameScreen.js ~ line 57 ~ addBuyInToPlayer ~ error", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require("../../assets/spaceChips.png")} style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {loading && <ActivityIndicator size="large" color={colors.white} />}
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

                                            {gamesData?.userGames.length == cashedOutPlayers.length && (
                                                <Button
                                                    mode="contained"
                                                    labelStyle={{ fontSize: 20, color: colors.white }}
                                                    disabled={gamesData?.userGames.length != cashedOutPlayers.length}
                                                    onPress={endGame(game.id)}
                                                    style={styles.endGameButton}
                                                    disabledStyle={{ backgroundColor: "red" }}
                                                >
                                                    End Game
                                                </Button>
                                            )}
                                            <Text style={{ color: colors.white }}>
                                                * You can end the game only after cashing out all the players
                                            </Text>
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
                                        {cashedOutPlayers.includes(item?.User?.id) && (
                                            <>
                                                <Text>Buy-Ins:{item.buy_ins_amount}</Text>
                                                <Text>Profit:{item.profit}</Text>
                                                <Text style={styles.buyInText}>Cashed Out</Text>
                                            </>
                                        )}

                                        {!cashedOutPlayers.includes(item?.User?.id) && (
                                            <>
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
                                                        onPress={() =>
                                                            console.log(`cancel buy-in for ${item?.User?.nickName}`)
                                                        }
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
                                            </>
                                        )}
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
    endGameButton: {
        width: 200,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderColor: colors.Accent,
        borderWidth: 2,
        marginVertical: 10,
        backgroundColor: colors.green,
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
