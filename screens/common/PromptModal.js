import React from "react";
import { View, Text, Image, Button } from "react-native";
import Modal from "react-native-modal";
import { SERVER_URL } from "../../config";

const PromptModal = ({ isVisible, onClose, imageUrl, headerText, buttonTexts, buttonColors, buttonActions }) => {
    return (
        <Modal isVisible={isVisible} onBackdropPress={onClose}>
            <View style={styles.container}>
                <Text style={styles.closeButton} onPress={onClose}>X</Text>
                <Image source={{ uri: `${SERVER_URL}/${imageUrl}` }} style={styles.image} />
                <Text style={styles.headerText}>{headerText}</Text>
                <View style={styles.buttonsContainer}>
                    {buttonTexts.map((text, index) => (
                        <Button key={index} title={text} onPress={buttonActions[index]} color={buttonColors[index]} />
                    ))}
                </View>
                <Text>Cash Out Player</Text>
                <View style={styles.cashOutContainer}>
                    <Text>Total Buy Ins</Text>
                    <Text>Cash In Hand Amount</Text>
                    <Text>Profit</Text>
                </View>
                <Button title="Save" onPress={onClose} />
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
    buttonsContainer: {
        flexDirection: "row-reverse",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        flexWrap:"wrap",
    },
    cashOutContainer: {
        flexDirection: "row-reverse",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        flexWrap:"wrap",
    },
    closeButton: {
        position: "absolute",
        top: 8,
        left: 13,
        fontSize: 18,
        padding: 0,
        minWidth: 0,
        minHeight: 0,
        backgroundColor: "transparent",
        color: "red",
        fontWeight: "bold",

    },

    image: {
        width: 100,
        height: 100,
        marginBottom: 16,
        alignSelf: "center",
        borderRadius: 15,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
    },
};

export default PromptModal;
