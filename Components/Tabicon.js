import React from 'react';

import {View, Image, Text} from 'react-native';
import {COLORS, SIZES} from '../Constatnts/theme';

const Tabicon = ({focused, icon, iconStyle, label, isTrade}) => {
  if (isTrade) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: COLORS.black,
        }}
      ><Image source={icon} resizeMode="contain" style={{height:25,width:25,tintColor:COLORS.white,...iconStyle}}/>
        <Text style={{color: COLORS.white}}>Trade</Text>
      </View>
    );
  } else {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: focused ? COLORS.white : COLORS.secondary,
            ...iconStyle,
          }}
        ></Image>
        <Text style={{color: focused ? COLORS.white : COLORS.secondary}}>
          {label}
        </Text>
      </View>
    );
  }
};
export default Tabicon;
