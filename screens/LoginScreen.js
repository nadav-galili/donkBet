import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, View, TextInput, Text, SafeAreaView, ImageBackground } from "react-native";
import { colors } from "../colors";
import AppButton from "../components/AppButton";
import userService from "../services/userService";
import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";

const validationSchema = Yup.object().shape({
    password: Yup.string().required().min(4).label("password"),
    nickname: Yup.string().required().min(2).label("nickname"),
});

const LoginScreen = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const initialValues = { password: "", nickname: "" };
    const [error, setError] = useState(null);
    const [formikState, setFormikState] = useState(initialValues);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        console.log("sssss", values);
        try {
            const res = await userService.login(values.nickname, values.password);
        } catch (error) {
            if (error.response) {
                console.log("🚀 ~ file: LoginScreen.js:2521 ~ handleSubmit ~ error.response", error.response);
                setError(error.response.data);
                Toast.show({
                    type: "error",
                    position: "top",
                    text1: error.response.data,
                    visibilityTime: 3000,
                    autoHide: true,
                });
            }
            console.log("🚀 ~ file: LoginScreen.js:25 ~ handleSubmit ~ error", error);
            setError(error.message);
        }
    };

    return (
        <SafeAreaView style={styles.ImageBack}>
            <ImageBackground source={require("../assets/liquid-cheese.png")} style={styles.ImageBack}>
                <View style={styles.container}>
                    <Formik initialValues={formikState} onSubmit={handleSubmit} validationSchema={validationSchema}>
                        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
                            <>
                                <Text style={styles.label}>Nick Name</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nick Name"
                                    onChangeText={handleChange("nickname")}
                                    onBlur={() => setFieldTouched("nickname")}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                                {touched.nickname && errors.nickname && (
                                    <Text style={styles.error}>{errors.nickname}</Text>
                                )}
                                <Text style={styles.comment}>you can change your nick name later</Text>
                                <Text style={styles.label}>Password</Text>

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
                                <AppButton
                                    color={colors.green}
                                    width="80%"
                                    text="Login"
                                    onPress={handleSubmit}
                                    disabled={loading}
                                />
                                {loading && <ActivityIndicator />}
                            </>
                        )}
                    </Formik>
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
        color: colors.Accent,
        alignSelf: "flex-end",
        paddingLeft: 10,
        // marginLeft: 45,
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

export default LoginScreen;
