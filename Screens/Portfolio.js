import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import {connect} from 'react-redux';
import MainLayout from './MainLayout';
import {getHoldings} from '../store/market/marketActions';
import BalanceInfo from '../Components/BalanceInfo';
import {SIZES, COLORS} from '../Constatnts/theme';
import dummyData from '../Constatnts/dummy';
import icons from '../Constatnts/icons';
import {Chart} from '../Components';
import {useState} from 'react';

const Portfolio = ({getHoldings, myHoldings}) => {
  const [selectedcoin, setSelectedcoin] = React.useState(null);

  useFocusEffect(
    React.useCallback(() => {
      getHoldings((holdings = dummyData.holdings));
    }, []),
  );
  let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
  let valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0,
  );
  let percChange = (valueChange / (totalWallet - valueChange)) * 100;
  function renderCurrentBalanceSection() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}
      >
        <Text
          style={{
            marginTop: 30,
            color: COLORS.white,
            fontSize: 30,
            fontWeight: 'bold',
          }}
        >
          Portfolio
        </Text>

        <BalanceInfo
          title="Current Balance"
          displayAmount={totalWallet}
          changePct={percChange}
          containerStyle={{
            marginTop: SIZES.radius,
            marginBottom: SIZES.padding,
          }}
        />
      </View>
    );
  }
  return (
    <MainLayout>
      <View style={{flex: 1, backgroundColor: COLORS.black}}>
        {renderCurrentBalanceSection()}

        <Chart
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          chartPrices={
            selectedcoin
              ? selectedcoin?.sparkline_in_7d?.value : myHoldings[0]?.sparkline_in_7d?.value}
          
          
        />

        <FlatList
          data={myHoldings}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View>
              <Text
                style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}
              >
                Your Assests
              </Text>
              <View style={{flexDirection: 'row', marginTop: SIZES.radius}}>
                <Text style={{color: COLORS.lightGray3, flex: 1}}>Assest</Text>
                <Text
                  style={{
                    color: COLORS.lightGray3,
                    flex: 1,
                    textAlign: 'right',
                  }}
                >
                  Price
                </Text>
                <Text
                  style={{
                    color: COLORS.lightGray3,
                    flex: 1,
                    textAlign: 'right',
                  }}
                >
                  Holdings
                </Text>
              </View>
            </View>
          }
          renderItem={({item}) => {
            let priceColor =
              item.price_change_percentage_7d_in_currency == 0
                ? COLORS.lightGray3
                : item.price_change_percentage_7d_in_currency > 0
                ? COLORS.lightgreen
                : COLORS.red;
            return (
              <TouchableOpacity
              onPress={() => setSelectedcoin(item)}
                style={{flexDirection: 'row', height: 55}}
              >
                <View
                  style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
                >
                  <Image
                    source={{uri: item.image}}
                    style={{width: 20, height: 20}}
                  />
                  <Text style={{color: COLORS.white, marginLeft: SIZES.radius}}>
                    {item.name}
                  </Text>
                </View>

                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text
                    style={{
                      color: COLORS.white,
                      marginLeft: SIZES.radius,
                      textAlign: 'right',
                      lineHeight: 15,
                    }}
                  >
                    $ {item.current_price.toLocaleString()}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {item.price_change_percentage_7d_in_currency != 0 && (
                      <Image
                        source={icons.upArrow}
                        style={{
                          height: 10,
                          width: 10,
                          tintColor: priceColor,
                          transform:
                            item.price_change_percentage_7d_in_currency > 0
                              ? [{rotate: '45deg'}]
                              : [{rotate: '125deg'}],
                        }}
                      />
                    )}
                    <Text
                      style={{marginLeft: 5, color: priceColor, lineHeight: 15}}
                    >
                      {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                    </Text>
                  </View>
                </View>

                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: COLORS.white,
                      lineHeight: 15,
                    }}
                  >
                    $ {item.total.toLocaleString()}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: COLORS.lightGray3,
                      lineHeight: 15,
                    }}
                  >
                    {item.qty} {item.symbol.toUpperCase()}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </MainLayout>
  );
};
function mapStateToProps(state) {
  return {
    myHoldings: state.marketReducer.myHoldings,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getHoldings: (
      holdings,
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page,
    ) => {
      return dispatch(
        getHoldings(
          holdings,
          currency,
          coinList,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page,
        ),
      );
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
