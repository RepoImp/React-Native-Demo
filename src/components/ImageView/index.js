import React from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {normalize, hp, wp, isX, isAndroid} from '../../helper/responsiveScreen';

const ImageView = props => {
  const arrLength = props.data.img.length;
  const renderImage = () => {
    if (arrLength === 1) {
      return (
        <View>
          <Image
            source={{uri: props.data.img[0]}}
            style={styles.img1}
            resizeMode="cover"
          />
        </View>
      );
    } else if (arrLength == 2) {
      return (
        <View style={styles.view2}>
          <Image
            source={{uri: props.data.img[0]}}
            style={styles.img2}
            resizeMode="cover"
          />
          <Image
            source={{uri: props.data.img[1]}}
            style={styles.img2}
            resizeMode="cover"
          />
        </View>
      );
    } else if (arrLength == 3) {
      return (
        <View style={styles.view3}>
          <Image
            source={{uri: props.data.img[0]}}
            style={styles.img2}
            resizeMode="cover"
          />
          <View style={styles.space}>
            <Image
              source={{uri: props.data.img[1]}}
              style={styles.img3}
              resizeMode="cover"
            />
            <Image
              source={{uri: props.data.img[2]}}
              style={styles.img3}
              resizeMode="cover"
            />
          </View>
        </View>
      );
    } else if (arrLength == 4) {
      return (
        <View style={styles.view3}>
          <View style={styles.space}>
            <Image
              source={{uri: props.data.img[0]}}
              style={styles.img3}
              resizeMode="cover"
            />
            <Image
              source={{uri: props.data.img[1]}}
              style={styles.img3}
              resizeMode="cover"
            />
          </View>
          <View style={styles.space}>
            <Image
              source={{uri: props.data.img[2]}}
              style={styles.img3}
              resizeMode="cover"
            />
            <Image
              source={{uri: props.data.img[3]}}
              style={styles.img3}
              resizeMode="cover"
            />
          </View>
        </View>
      );
    } else if (arrLength > 4) {
      return (
        <View style={styles.view5}>
          <Image
            source={{uri: props.data.img[0]}}
            style={styles.img5big}
            resizeMode="cover"
          />
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{flexDirection: 'row', marginTop: hp(1)}}>
              {props.data.img.map((item, index) => {
                return (
                  index > 0 && (
                    <Image
                      source={{uri: item}}
                      style={styles.img5small}
                      resizeMode="cover"
                    />
                  )
                );
              })}
            </View>
          </ScrollView>
        </View>
      );
    }
  };
  return <View style={{flex: 1}}>{renderImage()}</View>;
};

export default ImageView;

export const styles = StyleSheet.create({
  img1: {
    width: wp(92),
    height: hp(30),
    borderRadius: wp(1.5),
    marginVertical: hp(2),
  },
  img2: {
    width: '49%',
    height: '100%',
    borderRadius: wp(1.5),
  },
  img3: {
    width: wp(45.2),
    height: '49%',
    borderRadius: wp(1.5),
  },
  img5big: {
    height: hp(30),
    width: '100%',
    borderRadius: wp(1.5),
  },
  img5small: {
    width: wp(21.2),
    height: wp(21.2),
    borderRadius: wp(1.5),
    marginRight: wp(2),
  },
  view2: {
    height: hp(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(2),
  },
  view3: {
    height: hp(30),
    width: wp(92),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(2),
  },
  view5: {
    width: wp(92),
    justifyContent: 'space-between',
    marginVertical: hp(2),
  },
  space: {
    justifyContent: 'space-between',
  },
});
