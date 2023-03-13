import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {View, Image, TouchableOpacity} from 'react-native';
import Home from '../Screens/Home';
import {setTradeModalVisibility} from '../store/tab/tabAction';
import {isTradeModalVisible} from '../store/tab/tabReducers'
import {connect} from 'react-redux';
import Market from '../Screens/Market';
import Profile from '../Screens/Profile';
import {COLORS} from '../Constatnts/theme';
import icons from '../Constatnts/icons';
import {Tabicon} from '../Components';
import Portfolio from '../Screens/Portfolio';

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({children, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </TouchableOpacity>
  );
};
const Tabs = ({setTradeModalVisibility, isTradeModalVisible}) => {
  function tradeTabButtonClickHandler() {
    console.log("clickk")
    setTradeModalVisibility(!isTradeModalVisible);
  }
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 140,
          backgroundColor: COLORS.primary,
          borderTopColor: 'transparent',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            if (!isTradeModalVisible) {
              return (
                <Tabicon focused={focused} icon={icons.home} label="Home" />
              );
            }
          },
        }}
        listeners={{
          tabPress:e=>{
            if (isTradeModalVisible) {
              e.preventDefault()
              
            }
          }
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          tabBarIcon: ({focused}) => {
            if (!isTradeModalVisible) {
            return (
              <Tabicon
                focused={focused}
                icon={icons.briefcase}
                label="Portfolio"
              />
            );
            }
          },
        }}
        listeners={{
          tabPress:e=>{
            if (isTradeModalVisible) {
              e.preventDefault()
              
            }
          }
        }}
      />
      <Tab.Screen
        name="Trade"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Tabicon
                focused={focused}
                icon={isTradeModalVisible? icons.close:icons.trade}
                iconStyle={isTradeModalVisible?{
                  width:15,height:15
                }:null}
                label="Trade"
                isTrade={true}
              />
            );
          },
          tabBarButton: props => (
            <TabBarCustomButton
              {...props}
              onPress={() => {
                tradeTabButtonClickHandler();
              }}
            />
          ),
        }}
        
      />
      <Tab.Screen
        name="Market"
        component={Market}
        options={{
          tabBarIcon: ({focused}) => {
            if (!isTradeModalVisible) {
            return (
              <Tabicon focused={focused} icon={icons.market} label="Market" />
            );
            }
          },
        }}
        listeners={{
          tabPress:e=>{
            if (isTradeModalVisible) {
              e.preventDefault()
              
            }
          }
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => {
            if (!isTradeModalVisible) {
            return (
              <Tabicon focused={focused} icon={icons.profile} label="Profile" />
            );
            }
          },
        }}
        listeners={{
          tabPress:e=>{
            if (isTradeModalVisible) {
              e.preventDefault()
              
            }
          }
        }}
      />
    </Tab.Navigator>
  );
};

// export default Tabs;
function mapStateToProps(state) {
  return {
    isTradeModalVisible: state.tabReducer.isTradeModalVisible,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setTradeModalVisibility: isVisible => {
      return dispatch(setTradeModalVisibility(isVisible));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
