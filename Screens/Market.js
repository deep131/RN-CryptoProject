import React from 'react';
import 'react-native-gesture-handler';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';

import MainLayout from './MainLayout';
import {connect} from 'react-redux';
import {getCoinMarket} from '../store/market/marketActions';

import {COLORS, SIZES} from '../Constatnts/theme';

import {TextButton, HeaderBar} from '../Components';
import icons from '../Constatnts/icons';

import constants from '../Constatnts/constatnts';
import {LineChart} from 'react-native-chart-kit';

const marketTabs = constants.marketTabs.map(marketTab => ({
  ...marketTab,
  ref: React.createRef(),
}));

const TabIndicator = ({measureLayout, scrollX}) => {
  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: 0,
        height: '100%',
        width: (SIZES.width - SIZES.radius * 2) / 2,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
      }}
    />
  );
};
const Tabs = ({scrollX, onpressButton}) => {
  const [measureLayout, setmeasureLayout] = React.useState([]);

  const continerRef = React.useRef();
  React.useEffect(() => {
    let ml = [];
    marketTabs.forEach(marketTab => {
      //  marketTab.ref.current.measureLayout(
      //     continerRef.current,
      //     (x, y, width, height) => {
      //       ml.push({
      //         x,
      //         y,
      //         width,
      //         height,
      //       });
      //       if (ml.length=== marketTabs.length) {
      //         setmeasureLayout(ml)
      //       }
      //     },
      //  );
    });
  }, [continerRef.current]);

  return (
    <View ref={continerRef} style={{flexDirection: 'row'}}>
      {measureLayout.length > 0 && (
        <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
      )}
      {marketTabs.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              // onpressButton(index)
            }}
            key={`MarketTab-${index}`}
            style={{flex: 1}}
          >
            <View
              ref={item.ref}
              style={{
                paddingHorizontal: 15,
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
              }}
            >
              <Text style={{color: COLORS.white}}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const Market = ({getCoinMarket, coins}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const marketScrollviewRef = React.useRef();
  const onpressButton = React.useCallback(marketTabIndex => {
    marketScrollviewRef?.current?.scrollToOffset({
      offset: marketTabIndex * SIZES.width,
    });
  });
  React.useEffect(() => {
    getCoinMarket();
  }, []);

  function renderButtons() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
        }}
      >
        <TextButton label="USD" />
        <TextButton
          label="% (7d)"
          containerStyle={{
            marginLeft: SIZES.base,
          }}
        />
        <TextButton
          label="Top"
          containerStyle={{
            marginLeft: SIZES.base,
          }}
        />
      </View>
    );
  }

  function renderList() {
    return (
      <Animated.FlatList
        data={marketTabs}
        contentContainerStyle={{
          marginTop: SIZES.padding,
        }}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
        renderItem={({item, index}) => {
          return (
            <View style={{flex: 1, width: SIZES.width}}>
              <FlatList
                data={coins}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => {
                  let priceColor =
                    item.price_change_percentage_7d_in_currency == 0
                      ? COLORS.lightGray3
                      : item.price_change_percentage_7d_in_currency >= 0
                      ? COLORS.lightgreen
                      : COLORS.red;

                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.padding,
                        marginBottom: 30,
                      }}
                    >
                      <View
                        style={{
                          flex: 1.5,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <Image
                          source={{uri: item.image}}
                          style={{width: 20, height: 20}}
                        />
                        <Text
                          style={{
                            color: COLORS.white,
                            marginLeft: SIZES.radius,
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>

                      <View style={{flex: 1, alignItems: 'center'}}>
                        <LineChart
                          withHorizontalLabels={false}
                          withVerticalLabels={false}
                          withDots={false}
                          withInnerLines={false}
                          withVerticalLines={false}
                          withOuterLines={false}
                          data={{
                            datasets: [{data: item.sparkline_in_7d.price}],
                          }}
                          width={80}
                          height={60}
                          chartConfig={{
                            color: () => priceColor,
                          }}
                          bezier
                          style={{
                            paddingRight: 0,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Text
                          style={{
                            color: COLORS.white,
                            fontSize: 14,
                            fontWeight: '500',
                          }}
                        >
                          ${item.current_price}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
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
                                  item.price_change_percentage_7d_in_currency >
                                  0
                                    ? [{rotate: '45deg'}]
                                    : [{rotate: '125deg'}],
                              }}
                            />
                          )}
                          <Text
                            style={{
                              marginLeft: 5,
                              color: priceColor,
                              lineHeight: 15,
                            }}
                          >
                            {item.price_change_percentage_7d_in_currency.toFixed(
                              2,
                            )}
                            %
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          );
        }}
      />
    );
  }
  return (
    <MainLayout>
      <View style={{flex: 1, backgroundColor: COLORS.black}}>
        <HeaderBar title="Market" />
        <View
          style={{
            marginTop: SIZES.radius,
            marginHorizontal: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.gray,
          }}
        >
          <Tabs scrollX={scrollX} onpressButton={onpressButton()} />
        </View>

        {renderButtons()}

        {renderList()}
      </View>
    </MainLayout>
  );
};
function mapStateToProps(state) {
  return {
    coins: state.marketReducer.coins,
  };
}
function mapDispatchToProps(dispatch) {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Market);
