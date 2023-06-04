import React, { useState } from "react";
import { StyleSheet, View, TextInput, Image, Text, SafeAreaView, ImageBackground, Platform } from "react-native";
import { colors } from "../colors";
import AppButton from "../components/AppButton";
import * as ImagePicker from "expo-image-picker";
import userService from "../services/userService";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("email"),
    password: Yup.string().required().min(4).label("password"),
    nickname: Yup.string().required().min(2).label("nickname"),
});

const SignUpScreen = () => {
    const [image, setImage] = useState(null);
    const initialValues = { email: "", password: "", nickname: "" };
    const [error, setError] = useState(null);
    const [formikState, setFormikState] = useState(initialValues);

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
        }
    };
    const handleSubmit = async (values) => {
        try {
            const formData = new FormData();
            if (image) {
                formData.append("image", {
                    name: `${values.nickname}.jpg`,
                    uri: image,
                    type: "image/jpeg",
                });
            }
            formData.append("email", values.email);
            formData.append("password", values.password);
            formData.append("nickname", values.nickname);
            const res = await userService.signUp(formData);
            console.log("🚀 ~ file: SignUpScreen.js:88 ~ handleSubmit ~ res", res.data);
        } catch (error) {
            console.log("🚀 ~ file: SignUpScreen.js90 ~ handleSubmit ~ error", error);
        }
    };

    return (
        <SafeAreaView style={styles.ImageBack}>
            <ImageBackground source={require("../assets/background.jpg")} style={styles.ImageBack}>
                <View style={styles.container}>
                    <Text style={styles.title}>Create A New Account</Text>
                    <View style={styles.form}>
                        {image && <Image source={{ uri: image }} style={styles.image} />}
                        <Formik initialValues={formikState} onSubmit={handleSubmit} validationSchema={validationSchema}>
                            {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
                                <>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Email"
                                        onChangeText={handleChange("email")}
                                        onBlur={() => setFieldTouched("email")}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                    {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Password"
                                        onChangeText={handleChange("password")}
                                        onBlur={() => setFieldTouched("password")}
                                        secureTextEntry
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                    {touched.password && errors.password && (
                                        <Text style={styles.error}>{errors.password}</Text>
                                    )}
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Nickname"
                                        onChangeText={handleChange("nickname")}
                                        onBlur={() => setFieldTouched("nickname")}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                    {touched.nickname && errors.nickname && (
                                        <Text style={styles.error}>{errors.nickname}</Text>
                                    )}
                                    <AppButton color={colors.green} width="80%" text="Sign Up" onPress={handleSubmit} />
                                </>
                            )}
                        </Formik>
                        <Text style={styles.comment}>you can do change your nick name later</Text>
                    </View>
                    <AppButton color={colors.green} width="80%" text="Upload Image" onPress={handleImagePicker} />
                    <Text style={styles.comment}>you can upload/edit your image later</Text>
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
    comment: {
        fontSize: 12,
    },
    error: {
        fontSize: 10,
        color: "red",
        backgroundColor: "#fff",
        marginVertical: 10,
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
