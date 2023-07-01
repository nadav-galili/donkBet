import React from "react";
import { View, Text, Image, Button } from "react-native";
import Modal from "react-native-modal";
import { SERVER_URL } from "../../config";

const PromptModal = ({ isVisible, onClose, imageUrl, headerText, buttonTexts, buttonColors, buttonActions }) => {
    return (
        <Modal isVisible={isVisible} onBackdropPress={onClose}>
            <View style={styles.container}>
                <Image source={{ uri: `${SERVER_URL}/${imageUrl}` }} style={styles.image} />
                <Text style={styles.headerText}>{headerText}</Text>
                <View style={styles.buttonsContainer}>
                    {buttonTexts.map((text, index) => (
                        <Button key={index} title={text} onPress={buttonActions[index]} color={buttonColors[index]} />
                    ))}
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
        marginBottom: 16,
        textAlign: "center",
    },
};

export default PromptModal;
