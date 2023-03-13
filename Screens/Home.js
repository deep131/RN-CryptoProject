import React from 'react';
import 'react-native-gesture-handler';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import MainLayout from './MainLayout';
import {connect} from 'react-redux';
import {getHoldings, getCoinMarket} from '../store/market/marketActions';
import {useFocusEffect} from '@react-navigation/native';
import dummyData from '../Constatnts/dummy';
import {COLORS, SIZES} from '../Constatnts/theme';
import BalanceInfo from '../Components/BalanceInfo';
import {IconTextButton} from '../Components';
import icons from '../Constatnts/icons';
 import {Chart} from '../Components';
const Home = ({getHoldings, getCoinMarket, myHoldings, coins}) => {
  const [selectedcoin, setSelectedcoin] = React.useState(null);

  useFocusEffect(
    React.useCallback(() => {
      getHoldings((holdings = dummyData.holdings));
      getCoinMarket();
    }, []),
  );
  let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
  let valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0,
  );
  let percChange = (valueChange / (totalWallet - valueChange)) * 100;
  function renderWalletInfoSection() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}
      >
        <BalanceInfo
          title="Your Wallet"
          displayAmount={totalWallet}
          changePct={percChange}
          containerStyle={{
            marginTop: 50,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            marginBottom: -15,
            paddingHorizontal: SIZES.radius,
          }}
        >
          <IconTextButton
            label="Transfer"
            icon={icons.send}
            containerstyle={{
              flex: 1,
              height: 40,
              marginRight: SIZES.radius,
            }}
          />
          <IconTextButton
            label="Withdraw"
            icon={icons.withdraw}
            containerstyle={{
              flex: 1,
              height: 40,
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <MainLayout>
      <View style={{flex: 1, backgroundColor: COLORS.black}}>
        {/* headerinfo */}
        {renderWalletInfoSection()}
        {/* <LineChart 
        /> */}
        <Chart
          containerStyle={{
            marginTop: SIZES.padding * 2,
            
          }}
          chartPrices={
            selectedcoin
              ? selectedcoin?.sparkline_in_7d?.price
              : coins[0]?.sparkline_in_7d?.price
          }
        />


        <FlatList
          data={coins}
          keyExtractor={item => item.id}
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
                style={{
                  height: 55,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <View style={{width: 35}}>
                  <Image
                    style={{height: 20, width: 20}}
                    source={{uri: item.image}}
                  ></Image>
                </View>
                <View style={{flex: 1}}>
                  <Text style={{color: COLORS.white, fontSize: 16}}>
                    {item.name}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: COLORS.white,
                      fontSize: SIZES.h4,
                    }}
                  >
                    $ {item.current_price}
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
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={{
            marginTop: 30,

            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View style={{marginBottom: SIZES.radius}}>
              <Text style={{color: COLORS.white, fontSize: 18}}>
                Top Cryptocurrency
              </Text>
            </View>
          }
          ListFooterComponent={<View style={{marginBottom: 50}}></View>}
        />
      </View>
    </MainLayout>
  );
};
function mapStateToProps(state) {
  return {
    myHoldings: state.marketReducer.myHoldings,
    coins: state.marketReducer.coins,
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
    getCoinMarket: (
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page,
    ) => {
      return dispatch(
        getCoinMarket(
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
