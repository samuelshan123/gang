import { StyleSheet, View } from "react-native";
import { colors } from "../../../theme/colors";
import GangChatList from "./GangChatList";




function GangChatContainer({messages,phone}){

    return(
        <View style={styles.container}>
           <GangChatList messages={messages} phone={phone}/>
        </View>
    )

}

export default GangChatContainer;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.background_color,
    }
})