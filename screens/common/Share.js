import React from "react";
import { Share, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const ShareIcon = ({ message }) => {
    const shareOptions = {
        title: "Title of the content",
        message: message,
    };

    const shareContent = async () => {
        try {
            await Share.share(shareOptions);
        } catch (error) {
            console.log("Error sharing:", error);
        }
    };

    return (
        <View>
            <TouchableOpacity onPress={shareContent}>
                <Icon name="share-alt" size={20} color="grey" />
            </TouchableOpacity>
        </View>
    );
};

export default ShareIcon;
