import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { colors } from "../../colors";

function BuyInsDetails({ gameDetails }) {
    const getRowBackgroundColor = (index) => {
        return index % 2 === 0 ? "white" : colors.LightBlue;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Buy Ins Details</Text>
            <FlatList
                data={gameDetails.gameDetails}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <View style={[styles.row, { backgroundColor: getRowBackgroundColor(index) }]}>
                        <Text style={styles.rowText}>{item?.User?.nickName}</Text>
                        <Text style={styles.rowText}>{item.buy_in_amount}</Text>
                        <Text style={styles.rowText}>
                            {new Date(item.updated_at).toLocaleTimeString("en-GB", {
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: false,
                                timeZone: "UTC",
                            })}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 20,
        width: "90%",
        alignSelf: "center",
    },
    header: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
        color: colors.white,
        textDecorationLine: "underline",
    },
    row: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row-reverse",
        justifyContent: "space-between",
    },
    rowText: {
        fontSize: 16,
        width: "30%",
    },
});

export default BuyInsDetails;
