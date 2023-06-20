import React from "react";
import { ImageBackground, View, StyleSheet, FlatList, Text, SafeAreaView, ScrollView } from "react-native";
import PageHeader from "../../components/PageHeader";
import { colors } from "../../colors";

const GameInfo = ({ gameId, createdAt, updatedAt }) => {
    const startDate = new Date(createdAt).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    const endDate = new Date(updatedAt).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    return (
        <View style={styles.headerContainer}>
            <PageHeader text="New Game" color={colors.darkPurple} />
            <Text>Game number: {gameId}</Text>
            <View style={styles.datesContainer}>
                <Text style={styles.date}>Started At: {startDate}</Text>
                <Text style={styles.date}>Updated At: {endDate}</Text>
            </View>
        </View>
    );
};

export default GameInfo;

const styles = StyleSheet.create({
    date: {
        color: colors.blue,
        fontSize: 10,
        fontWeight: "bold",
    },
    datesContainer: {
        alignItems: "center",
        justifyContent: "center",
    },

    headerContainer: {
        alignItems: "center",
        backgroundColor: colors.white,
        justifyContent: "center",
    },
});
