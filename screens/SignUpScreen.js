import React, { useState } from "react";
import { StyleSheet, View, TextInput, Image, Text, SafeAreaView, ImageBackground, Platform } from "react-native";
import { colors } from "../colors";
import AppButton from "../components/AppButton";
import * as ImagePicker from "expo-image-picker";
import userService from "../services/userService";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    password: Yup.string().required().min(4).label("password"),
    nickname: Yup.string().required().min(2).label("nickname"),
});

const SignUpScreen = ({ navigation }) => {
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
            formData.append("password", values.password);
            formData.append("nickName", values.nickname);
            const res = await userService.signUp(formData);
            console.log("🚀 ~ file: SignUpScreen.js:88 ~ handleSubmit ~ res", res.data);
            if (res.data.error) {
                setError(res.data.error);
                return;
            }
            setError(null);
            setFormikState(initialValues);
            if (res.status === 200) {
                alert("Sign Up Success");
                //redirect to login
                navigation.navigate("Login");
            } else {
                alert("Sign Up Failed");
            }
        } catch (error) {
            alert("Sign Up Failed");
            console.log("🚀 ~ file: SignUpScreen.js90 ~ handleSubmit ~ error", error);
        }
    };

    return (
        <SafeAreaView style={styles.ImageBack}>
            <ImageBackground source={require("../assets/background.jpg")} style={styles.ImageBack}>
                <View style={styles.container}>
                    <Text style={styles.title}>Create A New Account</Text>
                    {error && <Text style={styles.error}>{error}</Text>}
                    <View style={styles.form}>
                        {image && <Image source={{ uri: image }} style={styles.image} />}
                        <Formik initialValues={formikState} onSubmit={handleSubmit} validationSchema={validationSchema}>
                            {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
                                <>
                                    {/* <TextInput
                                        style={styles.input}
                                        placeholder="Email"
                                        onChangeText={handleChange("email")}
                                        onBlur={() => setFieldTouched("email")}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                    {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>} */}
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
                                    <Text style={styles.comment}>you can do change your nick name later</Text>
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
                                    <AppButton color={colors.green} width="80%" text="Sign Up" onPress={handleSubmit} />
                                </>
                            )}
                        </Formik>
                        <AppButton color={colors.green} width="80%" text="Upload Image" onPress={handleImagePicker} />
                        <Text style={styles.comment}>you can upload/edit your image later</Text>
                    </View>
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
        color: colors.green,
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

export default SignUpScreen;
