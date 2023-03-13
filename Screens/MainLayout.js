import React from 'react';
import {View, Animated,Image} from 'react-native';
import {COLORS, SIZES} from '../Constatnts/theme';
import icons from '../Constatnts/icons';
import {connect} from 'react-redux';
import {IconTextButton} from '../Components';
const MainLayout = ({children, isTradeModalVisible}) => {
const ModalAnimatedValue=React.useRef(new Animated.Value(0)).current;

React.useEffect(()=>{
    if (isTradeModalVisible) {
        Animated.timing(ModalAnimatedValue,{
            toValue:1,
            duration:500,useNativeDriver:false 
        }).start();
    }else{
        Animated.timing(ModalAnimatedValue,{
            toValue:0,
            duration:500,useNativeDriver:false 
        }).start();  
    }
},[isTradeModalVisible])


const modalY=ModalAnimatedValue.interpolate({
    inputRange:[0,1],
    outputRange:[SIZES.height,SIZES.height-280]
})
  return (
    <View style={{flex: 1}}>
      {children}

      {isTradeModalVisible&&
      <Animated.View
      style={{
        position:'absolute',
        top:0,
        left:0,
        right:0,bottom:0,backgroundColor:COLORS.transparentBlack 
      }}
      opacity={ModalAnimatedValue}
      />
      }

      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          top:modalY,
          width: '100%',
          padding: SIZES.padding,
          backgroundColor: COLORS.primary,
        }}
      >
        <IconTextButton
          label="Transfer"
          icon={icons.send}
          onPress={() => {
            console.log('transfer');
          }}
        />
        <IconTextButton
          label="Withdraw"
          icon={icons.withdraw}
          containerstyle={{
            marginTop:SIZES.base
          }}
          onPress={() => {
            console.log('withdraw');
          }}
        />
      </Animated.View>
    </View>
  );
};
//

function mapStateToProps(state) {
  return {
    isTradeModalVisible: state.tabReducer.isTradeModalVisible,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setTradeModalVisibility: isVisible => {},
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
