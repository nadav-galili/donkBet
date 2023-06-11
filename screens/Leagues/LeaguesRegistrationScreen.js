import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, Image } from "react-native";
import { colors } from "../../colors";
import PageHeader from "../../components/PageHeader";
import leagueService from "../../services/leagueService";
import { Text, TextInput, Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import { useRoute } from "@react-navigation/native";

const validationSchema = Yup.object().shape({
    leagueName: Yup.string().required().min(2).label("leagueName"),
});

const LeaguesRegistrationScreen = ({ navigation }) => {
    const initialValues = { leagueName: "" };
    const [formikState, setFormikState] = useState(initialValues);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const route = useRoute();

    const user = route.params.user;
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
                    name: `${values.leagueName}.jpg`,
                    uri: image,
                    type: "image/jpeg",
                });
            }
            formData.append("leagueName", values.leagueName);
            formData.append("userId", user.id);

            const res = await leagueService.createLeague(formData);
            if (res.status === 200) {
                Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: "League Created",
                    text2: "Please wait while we redirect you to the home page",
                });
                setTimeout(() => {
                    navigation.navigate("MyLeagues", { screen: "LeagueTab" });
                }, 300);
            }
        } catch (error) {
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: error.message,
                text2: "Please try again",
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.regitrationContainer}>
                <PageHeader text="+ Create A New League" color={colors.purple} variant="titleLarge" />
                <Formik initialValues={formikState} onSubmit={handleSubmit} validationSchema={validationSchema}>
                    {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
                        <>
                            {!image && (
                                <Image source={require("../../assets/default_team.webp")} style={styles.image} />
                            )}
                            {image && <Image source={{ uri: image }} style={styles.image} />}

                            <Button icon="image-edit" mode="outlined" onPress={handleImagePicker}>
                                Upload Team Image
                            </Button>

                            <TextInput
                                style={styles.input}
                                placeholder="league Name"
                                onChangeText={handleChange("leagueName")}
                                onBlur={() => setFieldTouched("leagueName")}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            {touched.leagueN && errors.leagueN && <Text style={styles.error}>{errors.leagueN}</Text>}
                            <Button
                                mode="contained"
                                width="80%"
                                text="Sign Up"
                                onPress={handleSubmit}
                                disabled={loading}
                            >
                                Submit
                            </Button>

                            {loading && <ActivityIndicator />}
                        </>
                    )}
                </Formik>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    regitrationContainer: {
        // flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginVertical: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.blue,
    },
    input: {
        width: "80%",
        height: 70,
        backgroundColor: colors.white,
        borderRadius: 10,
        fontSize: 18,
        fontWeight: "bold",
        color: colors.blue,
        marginVertical: 40,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: colors.blue,
        textAlign: "left",
    },
});
export default LeaguesRegistrationScreen;
