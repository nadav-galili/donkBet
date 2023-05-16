import React, { useState } from "react";
import { StyleSheet, View, TextInput, Image, Text, SafeAreaView, ImageBackground } from "react-native";
import { colors } from "../colors";
import AppButton from "../components/AppButton";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { SERVER_URL } from "../config";
import userService from "../services/userService";
import { Formik } from "formik";
import * as Yup from "yup";

// Define validation schema using Yup
const SignUpSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(4, "Too Short!").required("Required"),
    nickname: Yup.string().min(2, "Too Short!").required("Required"),
    image: Yup.string().matches(/file:\/\//, "Must be a valid image"),
});

const SignUpScreen = () => {
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
        }
    };

    const handleSubmit = async (values) => {
        const { email, password, nickname } = values;

        const formData = new FormData();
        if (image) {
            formData.append("image", {
                name: `${nickname}.jpg`,
                uri: image,
                type: "image/jpeg",
            });
        }
        formData.append("email", email);
        formData.append("password", password);
        formData.append("nickname", nickname);

        try {
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
                    <Formik
                        initialValues={{ email: "", password: "", nickname: "", image: null }}
                        validationSchema={SignUpSchema}
                        onSubmit={handleSubmit}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            errors,
                            touched,
                            validateField,
                            setFieldTouched,
                        }) => (
                            <View style={styles.form}>
                                {values.image && <Image source={{ uri: values.image }} style={styles.image} />}
                                <TextInput
                                    placeholder="Enter your Email"
                                    onChangeText={handleChange("email")}
                                    onBlur={() => {
                                        handleBlur("email");
                                        setFieldTouched("email");
                                        validateField("email");
                                    }}
                                    value={values.email}
                                    style={styles.input}
                                />
                                {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

                                <TextInput
                                    placeholder="Enter your Password"
                                    onChangeText={handleChange("password")}
                                    onBlur={() => {
                                        handleBlur("password");
                                        setFieldTouched("password");
                                        validateField("password");
                                    }}
                                    value={values.password}
                                    secureTextEntry={true}
                                    style={styles.input}
                                />
                                {touched.password && errors.password && (
                                    <Text style={styles.error}>{errors.password}</Text>
                                )}

                                <TextInput
                                    placeholder="Enter your User Name"
                                    onChangeText={handleChange("nickname")}
                                    onBlur={() => {
                                        handleBlur("nickname");
                                        setFieldTouched("nickname");
                                        validateField("nickname");
                                    }}
                                    value={values.nickname}
                                    style={styles.input}
                                />
                                {touched.nickname && errors.nickname && (
                                    <Text style={styles.error}>{errors.nickname}</Text>
                                )}

                                <Text style={styles.comment}>you can do change your nick name later</Text>
                            </View>
                        )}
                    </Formik>
                    <AppButton color={colors.green} width="80%" text="Upload Image" onPress={handleImagePicker} />
                    <Text style={styles.comment}>you can upload/edit your image later</Text>
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
    comment: {
        fontSize: 12,
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
    error: {
        color: "red",
        fontSize: 12,
        backgroundColor: "#fff",
        margin: 5,
    },
});

export default SignUpScreen;
