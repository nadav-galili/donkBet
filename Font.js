import * as Font from "expo-font";

export const loadFonts = async () => {
    await Font.loadAsync({
        "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
        // 'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
        // 'OpenSans-Regular': require('../assets/fonts/OpenSans-Regular.ttf'),
    });
};
