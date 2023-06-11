import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { SERVER_URL } from "../config";
import { colors } from "../colors";

const LeagueAvatar = ({ avatarSource }) => {
    return (
        <View>
            <Image source={{ uri: `${SERVER_URL}/${avatarSource}` }} style={styles.avatar} />
        </View>
    );
};

const styles = StyleSheet.create({
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 15,
        borderColor: colors.MediumBlue,
        borderWidth: 5,
        marginVertical: 10,
    },
});

export default LeagueAvatar;
