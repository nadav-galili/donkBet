import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { SERVER_URL } from "../config";

const UserAvatar = ({ avatarSource }) => {
    return (
        <View>
            <Image source={{ uri: `${SERVER_URL}/${avatarSource}` }} style={styles.avatar} />
        </View>
    );
};

const styles = StyleSheet.create({
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
});

export default UserAvatar;
