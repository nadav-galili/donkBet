import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, View, Text, TextInput, SafeAreaView, ImageBackground } from "react-native";
import { colors } from "../colors";
import AppButton from "../components/AppButton";
import AppLogo from "../components/AppLogo";
import userService from "../services/userService";
import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";

const validationSchema = Yup.object().shape({
    password: Yup.string().required().min(4).label("password"),
    nickname: Yup.string().required().min(2).label("nickname"),
});

const LoginScreen = ({ navigation }) => {
    const initialValues = { password: "", nickname: "" };
    const [error, setError] = useState(null);
    const [formikState, setFormikState] = useState(initialValues);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        try {
            const res = await userService.login(values.nickname, values.password);
            if (res.token) {
                navigation.navigate("MyLeagues", { screen: "LeagueTab" });
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data);
                Toast.show({
                    type: "error",
                    position: "top",
                    text1: error.response.data,
                    visibilityTime: 3000,
                    autoHide: true,
                });
            }
            setError(error.message);
        }
    };

    return (
        <SafeAreaView style={styles.ImageBack}>
            <ImageBackground source={require("../assets/spaceChips.png")} style={styles.ImageBack} blurRadius={2}>
                <View style={styles.container}>
                    <AppLogo />

                    <Text style={styles.title}>Login to your account</Text>
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
        color: colors.MediumBlue,
        backgroundColor: "#fff",
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
        resizeMode: "contain",
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
        fontFamily: "serif",
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
        color: colors.white,
        alignSelf: "flex-end",
        paddingLeft: 50,
        fontFamily: "Roboto",
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
});

export default LoginScreen;
