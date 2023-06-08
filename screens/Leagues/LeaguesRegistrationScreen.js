import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, Image } from "react-native";
import { colors } from "../../colors";
import PageHeader from "../../components/PageHeader";
import { Text, TextInput, Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";

const validationSchema = Yup.object().shape({
    leagueName: Yup.string().required().min(2).label("leagueName"),
});

const LeaguesRegistrationScreen = () => {
    const initialValues = { leagueName: "" };
    const [formikState, setFormikState] = useState(initialValues);
    const [loading, setLoading] = useState(false);
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
        console.log("🚀 ~ file: LeaguesRegistrationScreen.js:17 ~ handleSubmit ~ values:", values);
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
        // alignSelf: "flex-start",
        // marginLeft: 20,
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
