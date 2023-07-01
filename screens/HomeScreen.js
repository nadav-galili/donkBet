import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    ImageBackground,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { Button, Text } from "react-native-paper";
import userService from "../services/userService";

import { colors } from "../colors";

export default function HomeScreen({ navigation }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getUserDetails() {
            try {
                const me = await userService.getUserDetails();

                if (me.data) {
                    //navigate to myleagues
                    navigation.navigate("MyLeagues");
                }
            } catch (error) {
                console.log("Navigation.js: useEffect: getUserDetails: error: ", error);
            }
        }

        setLoading(true);
        getUserDetails();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={require("../assets/spaceChips.png")}
                style={styles.backgroundImage}
                blurRadius={2}
                resizeMode="cover"
            >
                {loading ? (
                    <ActivityIndicator size="large" color={colors.Accent} />
                ) : (
                    <>
                        <View style={styles.logoContainer}>
                            <Image source={require("../assets/pokerDonkey.png")} style={styles.image} />
                            <Text style={styles.header}>Poker Donkey</Text>
                        </View>
                        {/* <Text style={styles.header}>Donk Bet App</Text> */}
                        <View style={styles.bottomContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                <Button
                                    mode="contained"
                                    icon="login"
                                    buttonColor={colors.Complementary}
                                    contentStyle={{ height: 50 }}
                                    labelStyle={{ fontSize: 16 }}
                                    style={styles.button}
                                >
                                    Login
                                </Button>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                                <Button
                                    mode="contained"
                                    icon="account-plus"
                                    buttonColor={colors.Background}
                                    onPress={() => navigation.navigate("SignUp")}
                                    contentStyle={{ height: 50 }}
                                    labelStyle={{ fontSize: 16 }}
                                    style={styles.button}
                                >
                                    Create an account
                                </Button>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={console.log("about")}>
                                <Button
                                    mode="contained"
                                    icon="information"
                                    buttonColor={colors.Accent}
                                    onPress={console.log("about")}
                                    contentStyle={{ height: 50 }}
                                    labelStyle={{ fontSize: 16 }}
                                    style={styles.button}
                                >
                                    Take A Tour
                                </Button>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
    },
    button: {
        borderRadius: 10,
        margin: 10,
        width: 300,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },

    container: {
        flex: 1,
    },
    header: {
        fontSize: 35,
        color: colors.white,
        textAlign: "center",
        marginVertical: 30,
        fontWeight: "700",
        textDecorationLine: "underline",
        fontFamily: "serif",
    },
    image: {
        width: 120,
        height: 120,
        alignSelf: "center",
        borderRadius: 100,
        marginTop: 40,
        // marginBottom: 20,
    },
    logoContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 10,
    },

    bottomContainer: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 50,
    },
});
