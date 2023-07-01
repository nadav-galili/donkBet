import React, { useState } from "react";
import { View, Text, Image, Button } from "react-native";
import { TextInput } from "react-native-paper";
import Modal from "react-native-modal";
import { SERVER_URL } from "../../config";

const CashOutModal = ({
    isVisible,
    onClose,
    imageUrl,
    headerText,
    totalBuyIns,
    buttonTexts,
    buttonColors,

    onCashOut,
}) => {
    const [cashOnHand, setCashOnHand] = useState("");

    const handleCashOnHandChange = (value) => {
        if (value === "") {
            setCashOnHand("");
            return;
        }
        setCashOnHand(value);
    };

    const handleCashOut = () => {
        onCashOut(cashOnHand);
    };

    return (
        <Modal isVisible={isVisible} onBackdropPress={onClose}>
            <View style={styles.container}>
                <Image source={{ uri: `${SERVER_URL}/${imageUrl}` }} style={styles.image} />
                <Text style={styles.headerText}>{headerText}</Text>
                <Text style={styles.headerText}>Total Buy-Ins: {totalBuyIns}</Text>
                <View style={styles.cashOnHand}>
                    <Text style={styles.cashOnHandText}>Total Cash On Hand:</Text>
                    <TextInput
                        style={styles.cashOnHandInput}
                        placeholder="Enter Amount"
                        keyboardType="numeric"
                        onChangeText={handleCashOnHandChange}
                        value={cashOnHand.toString()} // Convert to string since TextInput requires a string value
                    />
                </View>

                <Text style={styles.headerText}>Total Profit: {cashOnHand - totalBuyIns}</Text>
                <View style={styles.buttonsContainer}>
                    <Button title={buttonTexts[0]} onPress={handleCashOut} color={buttonColors[0]} />
                    <Button title={buttonTexts[1]} onPress={onClose} color={buttonColors[1]} />
                </View>
            </View>
        </Modal>
    );
};

const styles = {
    container: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
    },
    cashOnHand: {
        flexDirection: "row-reverse",
        justifyContent: "center",
        alignItems: "center",
    },
    cashOnHandText: {
        fontSize: 18,
        fontWeight: "bold",
        width: "50%",
        textAlign: "center",
    },
    cashOnHandInput: {
        width: "30%",
        height: 40,
        borderColor: "blue",
        borderWidth: 1,
        borderRadius: 8,
        textAlign: "center",
        backgroundColor: "white",
        fontSize: 13,
    },
    buttonsContainer: {
        flexDirection: "row-reverse",
        justifyContent: "space-around",
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 16,
        alignSelf: "center",
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 8,
        textAlign: "center",
    },
};

export default CashOutModal;
