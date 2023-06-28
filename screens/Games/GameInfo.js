import React from "react";
import { ImageBackground, View, StyleSheet, FlatList, Text, SafeAreaView, ScrollView } from "react-native";
import PageHeader from "../../components/PageHeader";
import { colors } from "../../colors";

const GameInfo = ({ gameId, createdAt, updatedAt }) => {
    const startDate = new Date(createdAt).toLocaleTimeString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "UTC",
    });

    const endDate = new Date(updatedAt).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "UTC",
    });

    return (
        <View style={styles.headerContainer}>
            <PageHeader text={`Game Id: ${gameId}`} color={colors.darkPurple} />
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
