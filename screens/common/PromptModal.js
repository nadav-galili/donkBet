import React from "react";
import { View, Text, Image, Button } from "react-native";
import Modal from "react-native-modal";
import { SERVER_URL } from "../../config";
import { colors} from "../../colors";
import { Input } from "react-native-elements";

const PromptModal = ({ isVisible, onClose, imageUrl, headerText, buttonTexts, buttonColors, buttonActions, selectedPlayerData,onCashOut }) => {
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
                <Text style={styles.cashOuTitle}>Cash Out Player ?</Text>
                <View style={styles.cashOutContainer}>
                    <Text>Total Buy Ins - {selectedPlayerData?.buy_ins_amount}</Text>
                    <View style={styles.cashInHandContainer}>
                    <Text>Cash In Hand Amount</Text>
                    <Input keyboardType="numeric" style={styles.cashInHandInput}/>
                    </View>
                    <Text>Profit</Text>
                </View>
                <Button title="Save Cash Out Data" onPress={onCashOut} />
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
    cashInHandContainer:{
        flexDirection: "row-reverse",
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
    },
    cashInHandInput:{
        width: "50%",
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        textAlign:"center",
        margin:5,
    },
    cashOutContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    cashOuTitle: {
        fontSize: 15,
        fontWeight: "bold",
        color: colors.purple,
        marginTop: 60,
        textAlign: "center",
        textDecorationLine: "underline",
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
