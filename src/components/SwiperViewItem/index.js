import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import FontText from '../FontText';
import SvgIcons from '../../assets/SvgIcons';
import colors from '../../assets/colors';
import {normalize, hp, wp, isX, isAndroid} from '../../helper/responsiveScreen';
import appConstant from '../../helper/appConstant';

const SwiperViewItem = props => {
  return (
    <View style={styles.slider}>
      <View>
        <View style={styles.childSlider}>
          <View style={styles.row}>
            <Image source={props.item.image} style={styles.img} />
            <View style={{marginLeft: wp(2)}}>
              <FontText
                size={normalize(13)}
                name={'montserrat-semibold'}
                color="black"
                textAlign="left">
                {props.item.name}
              </FontText>
              <FontText
                size={normalize(12)}
                style={{marginTop: hp(0.5)}}
                name={'montserrat-regular'}
                color="gray-dark"
                textAlign="left">
                {props.item.detail}
              </FontText>
            </View>
          </View>
          <View style={[styles.join, {marginTop: isAndroid ? hp(-1) : null}]}>
            {props.item.button == true ? (
              <TouchableOpacity onPress={() => {}} style={styles.joinButton}>
                <FontText
                  size={normalize(14)}
                  name={'montserrat-semibold'}
                  color="white"
                  textAlign="left">
                  {appConstant.join}
                </FontText>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
      {props.item.button == true ? (
        <View style={{marginTop: hp(-1.5)}}>
          <View style={styles.bottomslider}>
            <View style={styles.iconwithtext}>
              <SvgIcons.Trophy />
              <FontText
                size={normalize(13)}
                style={{marginLeft: wp(1)}}
                name={'montserrat-semibold'}
                color="black"
                textAlign="left">
                {props.item.btc + ` ` + appConstant.btc}
              </FontText>
            </View>
            <View style={styles.iconwithtext}>
              <SvgIcons.UserCircle />
              <FontText
                size={normalize(13)}
                style={{marginLeft: wp(1)}}
                name={'montserrat-semibold'}
                color="black"
                textAlign="left">
                {props.item.user}
              </FontText>
            </View>
            <View style={styles.iconwithtext}>
              <SvgIcons.Calendar />
              <FontText
                size={normalize(13)}
                style={{marginLeft: wp(1)}}
                name={'montserrat-semibold'}
                color="black"
                textAlign="left">
                {props.item.days + ` ` + appConstant.daysleft}
              </FontText>
            </View>
          </View>
          <View style={{marginTop: hp(0.5)}}>
            <TouchableOpacity
              onPress={() => {}}
              activeOpacity={0.6}
              style={styles.more}>
              <FontText
                size={normalize(13)}
                name={'montserrat-regular'}
                color="primary"
                textAlign="left">
                {appConstant.moreInfo}
              </FontText>
              <Image
                source={require('../../assets/imges/Info.png')}
                style={styles.img1}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default SwiperViewItem;
export const styles = StyleSheet.create({
  slider: {
    flex: 1,
  },
  childSlider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(10),
    height: hp(10),
    justifyContent: 'space-between',
  },
  bottomslider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: wp(8),
  },
  joinButton: {
    backgroundColor: colors.primary,
    width: wp(22),
    height: wp(8.5),
    borderRadius: hp(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconwithtext: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(1),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: hp(5.4),
    height: hp(5.4),
  },
  join: {
    width: wp(22),
    height: hp(4),
  },
  more: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img1: {
    height: hp(2),
    width: hp(2),
    marginLeft: wp(0.6),
  },
});
