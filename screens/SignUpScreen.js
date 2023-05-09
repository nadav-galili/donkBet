import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Image, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";

const SignUpScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [image, setImage] = useState(null);

    const handleImagePicker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Permission to access media library is required.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const assets = result.assets;

            const uri = assets[0].uri;
            setImage(uri);
            const type = uri.split(".")[1];
            const name = uri.split("/").pop();
            const file = {
                uri,
                type: `image/${type}`,
                name,
            };
            console.log("🚀 ~ file: SignUpScreen.js:33 ~ handleImagePicker ~ file:", file);
        }
    };

    const handleSubmit = () => {
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Nickname:", nickname);
        console.log("Image:", image);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <View style={styles.form}>
                {image && <Image source={{ uri: image }} style={styles.image} />}
                <TextInput
                    placeholder="Enter your email address"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Enter your nickname..you can do it later"
                    value={nickname}
                    onChangeText={setNickname}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.uploadButton} onPress={handleImagePicker}>
                    <Text style={styles.uploadText}>Upload Image</Text>
                </TouchableOpacity>
            </View>
            <Button title="Sign Up" onPress={handleSubmit} color="#fff" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    form: {
        width: "80%",
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#000",
        alignSelf: "center",
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#000",
        alignSelf: "flex-start",
        marginLeft: 15,
    },
    input: {
        width: 300,
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: "#fff",
    },
    buttonContainer: {
        backgroundColor: "#000",
        borderRadius: 5,
        width: 100,
        marginTop: 20,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
    },

    uploadButton: {
        backgroundColor: "#000",
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
    },
    uploadText: {
        color: "#fff",
        fontSize: 18,
    },
    signUpButton: {
        backgroundColor: "#000",
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default SignUpScreen;
