import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const PageHeader = ({ text, color, variant }) => {
    return (
        <View style={styles.container}>
            <Text variant={variant} style={[styles.text, { color }]}>
                {text}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        color: "white",
        textDecorationLine: "underline",
        fontSize: 24,
        fontWeight: "bold",
        fontFamily: "serif",
    },
});

export default PageHeader;
