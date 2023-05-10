import React, { useState } from "react";
import { StyleSheet, View, TextInput, Image, Text, SafeAreaView, ImageBackground, Platform } from "react-native";
import { colors } from "../colors";
import AppButton from "../components/AppButton";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const SignUpScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [image, setImage] = useState(null);

    const SERVER_URL = "http://localhost:3000";

    const createFormData = (photo, body = {}) => {
        let data = new FormData();
        const type = photo.split(".")[1];
        const name = photo.split("/").pop();
        const file = {
            photo,
            type: "image/jpeg",
            name,
        };
        data.append("photo", file);

        return data;
    };
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
            // const type = uri.split(".")[1];
            // const name = uri.split("/").pop();
            // const file = {
            //     uri,
            //     type: "image/jpeg",
            //     name,
            // };

            // console.log("🚀 ~ file: SignUpScreen.js:33 ~ handleImagePicker ~ file:", file);
        }
    };

    const handleSubmit = async () => {
        ///validate inputs
        ///validate inputs
        // if (!email || !password) {
        //     alert("Email and password are required.");
        //     return;
        // }
        // ///if email is not a valid email address
        // if (!email.includes("@") || !email.includes(".")) {
        //     alert("Email must be a valid email address.");
        //     return;
        // }
        // if (password.length < 4) {
        //     alert("Password must be at least 4 characters.");
        //     return;
        // }
        // ///if nickname is not a valid nickname
        // if (nickname && nickname.length < 2) {
        //     alert("Nickname must be at least 2 characters.");
        //     return;
        // }
        ///if image is not a valid image
        if (image && !image.includes("file://")) {
            alert("Image must be a valid image.");
            return;
        }

        ///if all inputs are valid
        ///send a request to the server
        if (!image) {
            setImage("anonymous.webp");
        }

        const formData = new FormData();
        formData.append("image", {
            name: new Date().getTime() + ".jpg",
            uri: image,
            type: "image/jpeg",
        });
        try {
            var config = {
                method: "post",
                url: "http://192.168.1.64:3030/api/users",
                headers: { Accept: "application/json, text/plain, /", "Content-Type": "multipart/form-data" },
                data: formData,
            };
            console.log("🚀 ~ file: SignUpScreen.js:100 ~ handleSubmit ~ formData", formData);
            const res = await axios(config);
            // const res = await axios.post(`http://192.168.1.64:3030/api/users`, formData, {
            //     Headers: {
            //         Accept: "application/json",
            //         "Content-Type": "multipart/form-data",
            //     },
            //     body: formData,
            // });
            console.log("🚀 ~ file: SignUpScreen.js:100 ~ handleSubmit ~ res", res.data);
        } catch (error) {
            console.log("🚀 ~ file: SignUpScreen.js:100 ~ handleSubmit ~ error", error);
        }

        // console.log(";;;d", createFormData(image, { email, password, nickname }));
        // try {
        //     const response = await fetch(`http://192.168.1.64:3030/api/users`, {
        //         method: "POST",
        //         body: createFormData(image, { email, password, nickname }),
        //     });
        //     const data = await response.json();
        //     console.log(data);
        // } catch (error) {
        //     console.error("ll", error);
        // }

        // const response = await fetch(`http://192.168.1.64:3030/api/users`, {
        //     method: "POST",
        //     body: createFormData(image, { email, password, nickname }),
        // });

        // const result = await response.json();
        // console.log("result", result);
        // let data = new FormData();
        // data.append("email", email);
        // data.append("password", password);
        // data.append("nickname", nickname ? nickname : "Anonymous");
        // data.append("image", {
        //     uri: image,
        //     type: "image/jpeg",
        //     name: "image.jpg",
        // });
        // fetch("http://localhost:3000/api/users", {
        //     method: "POST",
        //     body: data,
        // });
    };

    return (
        <SafeAreaView style={styles.ImageBack}>
            <ImageBackground source={require("../assets/background.jpg")} style={styles.ImageBack}>
                <View style={styles.container}>
                    <Text style={styles.title}>Create A New Account</Text>
                    <View style={styles.form}>
                        {image && <Image source={{ uri: image }} style={styles.image} />}
                        {/* <TextInput
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
                            placeholder="Enter your nickname"
                            value={nickname}
                            onChangeText={setNickname}
                            style={styles.input}
                        />
                        <Text>you can do change your nick name later</Text> */}
                    </View>
                    <AppButton color={colors.green} width="80%" text="Upload Image" onPress={handleImagePicker} />
                    <Text>you can upload/edit your image later</Text>
                    <AppButton color={colors.blue} width="80%" text="Sign Up" onPress={handleSubmit} />
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    ImageBack: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
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
        marginBottom: 40,
        color: colors.white,
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
