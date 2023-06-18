import React from "react";
import {
    ImageBackground,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Text,
    SafeAreaView,
    ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { colors } from "../../colors";
import AppLogo from "../../components/AppLogo";
import UserAvatar from "../../components/UserAvatar";

const NewGame = () => {
    const route = useRoute();

    const { user, leagues, leaguePlayers, selected } = route.params;
    console.log("🚀 ~ file: NewGameScreen.js:8 ~ NewGame ~ leaguePlayers:", leaguePlayers);
    console.log("🚀 ~ file: NewGameScreen.js:9 ~ NewGame ~ leaguePlayers:", selected);
    console.log("🚀 ~ file: NewGameScreen.js:10 ~ NewGame ~ leagues:", leagues);
    console.log("🚀 ~ file: NewGameScreen.js11 ~ NewGame ~ user:", user);
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require("../../assets/pokerChips4.png")} style={styles.container} blurRadius={1}>
                <ScrollView>
                    <View style={styles.avatar}>{user?.nickName && <UserAvatar avatarSource={user.image} />}</View>
                    <View style={styles.logoContainer}>
                        <AppLogo />
                    </View>
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
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
});

export default NewGame;
