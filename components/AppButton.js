import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const AppButton = ({ color, width, text, onPress, textColor }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: color, width }]}>
            <Text style={[styles.text, { color: textColor || styles.text.color }]}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 10,
        marginVertical: 8,
        alignSelf: "center",
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
});

export default AppButton;
