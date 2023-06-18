import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { SERVER_URL } from "../../config";
import { colors } from "../../colors";

const PlayerCard = ({ player, selected, onSelect }) => {
    const handleSelected = () => {
        onSelect(player.id);
    };

    return (
        <View style={[styles.card, selected && styles.selectedCard]}>
            <View style={styles.avatarContainer}>
                <Image style={styles.avatar} source={{ uri: `${SERVER_URL}/${player.User.image}` }} />
            </View>
            <Text style={styles.text}>{player.User.nickName}</Text>

            <TouchableOpacity style={[styles.button, selected && styles.selectedButton]} onPress={handleSelected}>
                <Text style={styles.buttonText}>{selected ? "Remove" : "Select"}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    selectedCard: {
        backgroundColor: colors.green,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#f1f1f1",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    button: {
        backgroundColor: "#007bff",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 10,
    },
    selectedButton: {
        backgroundColor: "red",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        textTransform: "capitalize",
    },
});

export default PlayerCard;
