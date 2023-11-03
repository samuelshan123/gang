import { Pressable , StyleSheet, Text } from "react-native";
import { colors } from "../../theme/colors";
import { fonts } from "../../theme/fonts";



function PrimaryButton({children,onPress}){

    return (
        <Pressable onPress={onPress} style={styles.button}>
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    )
}

export default PrimaryButton;

const styles = StyleSheet.create({
    button:{
        borderRadius:8,
        padding:15,
        backgroundColor:colors.primary_color,
        width:'80%',
        // margin:20
    },
    text:{
        color:'white',
        fontFamily:fonts.primary_bold,
        textAlign:'center'
    }
})