import React from "react";
import { View,Text } from "react-native";

 import { COLORS,SIZES } from "../Constatnts/theme";


 const HeaderBar=({title})=>{
    return(
        <View style={{height:100,paddingHorizontal:SIZES.radius,justifyContent:'flex-end'}}>

            <Text style={{color:COLORS.white,fontSize:SIZES.largeTitle,fontWeight:'bold'}}>{title}</Text>

        </View>
    )
 }
 export default HeaderBar