import { StyleSheet } from "react-native";

export default function RegisterCompanyStyle(colors) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            padding: 20,
            width: '100%',
            height: '100%',
        },
        image: {
            width: 80,
            height: 80,
            alignSelf: 'center',
            marginTop: 20,

        }
    })
}
