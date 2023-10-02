import React, { useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    View,
    TextInput,
    Image,
    Text,
    SafeAreaView,
    ImageBackground,
} from "react-native";
import { colors } from "../colors";
import AppButton from "../components/AppButton";
import * as ImagePicker from "expo-image-picker";
import userService from "../services/userService";
import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";

const validationSchema = Yup.object().shape({
    password: Yup.string().required().min(4).label("password"),
    nickname: Yup.string().required().min(2).label("nickname"),
});

const SignUpScreen = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const initialValues = { password: "", nickname: "" };
    const [error, setError] = useState(null);
    const [formikState, setFormikState] = useState(initialValues);
    const [loading, setLoading] = useState(false);

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
            //check if nickname has spaces
            if (values.nickname.includes(" ")) {
                setError("Nickname cannot contain spaces");
                return;
            }
            formData.append("password", values.password);
            formData.append("nickName", values.nickname);
            const res = await userService.signUp(formData);

            if (res?.data?.error) {
                setError(res.data.error);
                return;
            }
            setError(null);
            setFormikState(initialValues);

            if (res.status === 200) {
                await userService.login(values.nickname, values.password);

                navigation.navigate("MyLeagues", { screen: "LeagueTab" });
            } else {
                alert("Sign Up Failed");
            }
        } catch (error) {
            if (error.response.status === 400) {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "This nick name already exists",
                    text2: "Please choose a different nickname",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.ImageBack}>
            <ImageBackground source={require("../assets/big_purple_poker_chip2.png")} style={styles.ImageBack} blurRadius={6}>
                <View style={styles.container}>
                    <Text style={styles.title}>Create A New Account</Text>
                    {error && <Text style={styles.error}>{error}</Text>}
                    <View style={styles.form}>
                        {image && <Image source={{ uri: image }} style={styles.image} />}
                        <Formik initialValues={formikState} onSubmit={handleSubmit} validationSchema={validationSchema}>
                            {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
                                <>
                                    {/* <Text style={styles.label}>Nick Name</Text> */}
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
                                    <Text style={styles.change}>you can change your nick name later</Text>
                                    {/* <Text style={styles.label}>Password</Text> */}

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
                                      <AppButton color={colors.blue} width="80%" text="Upload Image" onPress={handleImagePicker} />
                        <Text style={styles.comment}>you can upload/edit your image later</Text>
                                    <AppButton
                                        color={colors.green}
                                        width="80%"
                                        text="Sign Up"
                                        onPress={handleSubmit}
                                        disabled={loading}
                                    />
                                    {loading && <ActivityIndicator />}
                                </>
                            )}
                        </Formik>
                      
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
    change: {
        fontSize: 14,
        color: colors.white,
        marginBottom: 10,
    },
    comment: {
        fontSize: 12,
        color: colors.white,
    },
    error: {
        fontSize: 15,
        color: "red",
        backgroundColor: "#fff",
        marginVertical: 10,
        padding: 5,
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
        color: colors.purple,
        alignSelf: "center",
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 10,
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

export default SignUpScreen;
