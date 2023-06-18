import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { SERVER_URL } from "../../config";

const PlayerCard = ({ player, selected, onSelect }) => {
    console.log("🚀 ~ file: PlayerSelectCard.js:6 ~ PlayerCard ~ selected:", selected);
    const handleSelected = () => {
        onSelect(player.id);
    };

    return (
        <View style={[styles.card, selected && styles.selectedCard]}>
            <View style={styles.avatarContainer}>
                <Image style={styles.avatar} source={{ uri: `${SERVER_URL}${player.User.image}` }} />
                <Text style={styles.text}>{player.User.nickName}</Text>

                <TouchableOpacity style={styles.button} onPress={handleSelected}>
                    <Text style={styles.buttonText}>{selected ? "Remove" : "Select"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    selectedCard: {
        backgroundColor: "green",
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#f1f1f1",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
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
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textTransform: "capitalize",
    },
});

export default PlayerCard;
