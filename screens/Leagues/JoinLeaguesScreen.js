import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";
import { colors } from "../../colors";
import PageHeader from "../../components/PageHeader";
import leagueService from "../../services/leagueService";
import { Text, TextInput, Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import { useRoute } from "@react-navigation/native";

const validationSchema = Yup.object().shape({
    leagueNumber: Yup.string().required().min(4).label("leagueNumber"),
});

const JoinLeaguesScreen = ({ navigation }) => {
    const initialValues = { leagueNumber: "" };
    const [formikState, setFormikState] = useState(initialValues);
    const [loading, setLoading] = useState(false);
    const route = useRoute();

    const user = route.params.user;

    const handleSubmit = async (values) => {
        try {
            //convert values.leagueNumber to number
            const leagueNumber = parseInt(values.leagueNumber);
            if (isNaN(leagueNumber)) {
                Toast.show({
                    type: "error",
                    position: "top",
                    text1: "Error",
                    text2: "League number must be a number",
                    visibilityTime: 3000,
                    autoHide: true,
                    topOffset: 40,
                });
                return;
            }

            // setLoading(true);
            const { data } = await leagueService.joinLeague(values.leagueNumber, user.id);
            // setLoading(false);
            console.log("🚀 ~ file: JoinLeaguesScreen.js:44 ~ handleSubmit ~ res:", data);
            Toast.show({
                topOffset: 60,
                type: "success",
                text1: "League Joined!",
                visibilityTime: 2000,
            });
            setTimeout(() => {
                navigation.navigate("MyLeagues", { screen: "LeagueTab" });
            }, 300);
        } catch (err) {
            if (err.response.status === 404) {
                Toast.show({
                    type: "error",
                    position: "top",
                    text1: err.response?.data?.message,
                    text2: "try a different league number",
                    visibilityTime: 3000,
                    autoHide: true,
                    topOffset: 40,
                });
                return;
            } else if (err.response.status === 400) {
                Toast.show({
                    type: "error",
                    position: "top",
                    text1: "Error",
                    text2: err.response?.data?.message,
                    visibilityTime: 3000,
                    autoHide: true,
                    topOffset: 40,
                });
                return;
            }
            setLoading(false);
            Toast.show({
                type: "error",
                position: "top",
                text1: "Error",
                text2: err.message,
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 40,
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.regitrationContainer}>
                <PageHeader text="Join A League" color={colors.purple} variant="titleLarge" />
                <Formik initialValues={formikState} onSubmit={handleSubmit} validationSchema={validationSchema}>
                    {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
                        <>
                            <Text>get the league number from your friends or get an invatation for the league</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="League Number"
                                onChangeText={handleChange("leagueNumber")}
                                onBlur={() => setFieldTouched("leagueNumber")}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            {touched.leagueNumber && errors.leagueNumber && (
                                <Text style={styles.error}>{errors.leagueNumber}</Text>
                            )}
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
    error: {
        color: "red",
        fontSize: 12,
        fontWeight: "bold",
    },

    regitrationContainer: {
        alignItems: "center",
        marginTop: 50,
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
export default JoinLeaguesScreen;
