import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const PageHeader = ({ text, color }) => {
    return (
        <View style={styles.container}>
            <Text variant="displaySmall" style={[styles.text, { color }]}>
                {text}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        color: "white",
        textDecorationLine: "underline",
    },
});

export default PageHeader;
