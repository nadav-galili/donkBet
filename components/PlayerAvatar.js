import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { SERVER_URL } from "../config";

const PlayerAvatar = ({ avatarSource, playerName }) => {
    return (
        <View style={styles.playerContainer}>
            <Image source={{ uri: `${SERVER_URL}/${avatarSource}` }} style={styles.avatar} />
            <Text style={styles.playerName}>{playerName}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    playerName: {
        fontSize: 10,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default PlayerAvatar;
