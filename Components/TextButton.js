import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {COLORS, SIZES} from '../Constatnts/theme';
const TextButton = ({label, containerStyle, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 3,
        paddingHorizontal: 18,
        borderRadius: 15,
        backgroundColor: COLORS.gray,
        ...containerStyle,
      }}
    onPress={onPress}
    >
<Text style={{color:COLORS.white,fontSize:SIZES.h3,fontWeight:'500'}}>{label}</Text>


    </TouchableOpacity>
  );
};
export default TextButton;
