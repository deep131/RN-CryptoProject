import React from 'react';
import {View, Text, Image} from 'react-native';
import {SIZES, COLORS} from '../Constatnts/theme';
import icons from '../Constatnts/icons';
const BalanceInfo = ({title, displayAmount, changePct, containerStyle}) => {
  return (
    <View style={{...containerStyle}}>
      <Text style={{color: COLORS.lightGray3, fontSize: SIZES.h3}}>
        {title}
      </Text>

      <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
        <Text style={{color: COLORS.lightGray3, fontSize: SIZES.h3}}>$</Text>
        <Text style={{color: COLORS.white, fontSize: SIZES.h2}}>
          {displayAmount.toLocaleString()}
        </Text>
        <Text style={{color: COLORS.lightGray3, fontSize:20}}> Usd</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
        {changePct != 0 && (
          <Image
            source={icons.upArrow}
            style={{
              width: 10,
              height: 10,
              alignSelf: 'center',
              tintColor: changePct > 0 ? COLORS.lightgreen : COLORS.red,
              transform:
                changePct > 0 ? [{rotate: '45deg'}] : [{rotate: '125deg'}],
            }}
          />
        )}
        <Text
          style={{
            margin: SIZES.base,
            alignSelf: 'flex-end',
            color:
              changePct == 0
                ? COLORS.lightGray3
                : changePct > 0
                ? COLORS.lightgreen
                : COLORS.red,
            fontSize: SIZES.h4,
          }}
        >
          {changePct.toFixed(2)}%
        </Text>
        <Text
          style={{
            margin: SIZES.radius,
            alignSelf: 'flex-end',
            color:COLORS.lightGray3,
          
            fontSize: SIZES.h4,
          }}
        >
        7d Changes
        </Text>
      </View>
    </View>
  );
};
export default BalanceInfo;
