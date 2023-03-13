import React from "react";
import { TouchableOpacity, View ,Image,Text} from "react-native";
import {COLORS,SIZES} from '../Constatnts/theme';
import icons from '../Constatnts/icons';

const IconTextButton=({icon,label,containerstyle,onPress})=>{
return(
    <TouchableOpacity onPress={onPress} 
    style={{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        height:50,
        backgroundColor:COLORS.white,
        borderRadius:SIZES.radius,
        ...containerstyle
    }}>
   
        <Image source={icon} resizeMode="contain"  
        style={{height:20,width:20}}/>
      <Text style={{marginLeft:SIZES.base,...SIZES.h3}}>{label}</Text>
    
    </TouchableOpacity>
)
}
export default IconTextButton;