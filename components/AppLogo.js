import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { colors } from "../colors";

const AppLogo = () => {
    return <Image source={require("../assets/pokerDonkey.png")} style={styles.image} />;
};

const styles = StyleSheet.create({
    image: {
        width: 80,
        height: 80,

        borderRadius: 50,
        borderWidth: 3,
        borderColor: colors.lightPink,
        marginBottom: 10,
    },
});
export default AppLogo;
