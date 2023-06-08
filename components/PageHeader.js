import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PageHeader = ({ text, color }) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, { color }]}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // height: 60,
        // justifyContent: "center",
        // justifyContent: "flex-start",
        // alignItems: "center",
    },
    text: {
        fontSize: 38,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        textDecorationLine: "underline",
    },
});

export default PageHeader;
