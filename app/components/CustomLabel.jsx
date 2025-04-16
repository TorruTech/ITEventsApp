import { View, Text, StyleSheet } from "react-native"

export const CustomLabel = ({ text }) => (
    <View style={styles.container}>
        <Text style={styles.text}>
            { text }
        </Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#8B8888",
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 8,
        marginBottom: 8
    },
    text: {
        color: "white",
        fontSize: 12,
        fontWeight: "500"
    }
})