import React from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {normalize, hp, wp, isX, isAndroid} from '../../helper/responsiveScreen';
import colors from '../../assets/colors';
import FontText from '../FontText';
import appConstant from '../../helper/appConstant';

const AssetView = props => {
  return (
    <View style={{marginHorizontal: wp(4)}}>
      <View>
        <FontText
          size={normalize(15)}
          name={'montserrat-semibold'}
          color="black"
          pBottom={hp(3)}
          textAlign="left">
          {appConstant.asset}
        </FontText>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <FontText
          size={normalize(12)}
          name={'montserrat-regular'}
          color="gray-dark"
          textAlign="left">
          {appConstant.symbol}
        </FontText>
        <FontText
          size={normalize(12)}
          name={'montserrat-regular'}
          color="gray-dark"
          textAlign="center">
          {appConstant.marketPrice}
        </FontText>
        <FontText
          size={normalize(12)}
          name={'montserrat-regular'}
          color="gray-dark"
          textAlign="right">
          {appConstant.amount}
        </FontText>
      </View>
      <View>
        {props?.data &&
          props.data.map((item, index) => {
            return (
              <View>
                <View style={styles.setview}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: wp(30),
                    }}>
                    <Image source={item.icon} style={styles.img} />
                    <FontText
                      size={normalize(13)}
                      name={'montserrat-regular'}
                      color="black"
                      pLeft={wp(1)}
                      textAlign="left">
                      {item.name}
                    </FontText>
                  </View>

                  <View style={{width: wp(32), alignItems: 'center'}}>
                    <FontText
                      size={normalize(13)}
                      name={'montserrat-regular'}
                      color="black"
                      textAlign="left">
                      {`${item.marketprice} ${appConstant.usd}`}
                    </FontText>
                  </View>
                  <View style={{width: wp(30)}}>
                    <FontText
                      size={normalize(13)}
                      name={'montserrat-regular'}
                      color="black"
                      textAlign="right">
                      {item.amount}
                    </FontText>
                  </View>
                </View>
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default AssetView;

export const styles = StyleSheet.create({
  line: {
    height: hp(6),
    width: wp(0.6),
    backgroundColor: colors['gray-devider'],
  },

  exchangeview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors['gray-lightest'],
    marginRight: wp(2),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    borderRadius: wp(1.5),
  },
  setview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp(2),
    width: wp(92),
  },
  img: {
    width: wp(4),
    height: wp(4),
  },
});
