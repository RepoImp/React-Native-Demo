import React, {useState} from 'react';
import {View, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import FontText from '../../components/FontText';
import colors from '../../assets/colors';
import SvgIcons from '../../assets/SvgIcons';
import {normalize, hp, wp, isX, isAndroid} from '../../helper/responsiveScreen';

const LockPopup = props => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.modalVisible}
      // onRequestClose={props.closePopup}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.margin}>
            <View style={{alignItems: 'center'}}>
              <SvgIcons.Lock height={wp(15)} width={wp(15)} />
            </View>
            <View style={{marginTop: hp(1)}}>
              <FontText
                size={normalize(14)}
                name={'montserrat-regular'}
                color="black"
                textAlign="center">
                {props.message}
              </FontText>
            </View>
          </View>

          <View>
            <View style={styles.line}></View>
            <View style={{marginVertical: hp(2)}}>
              <TouchableOpacity
                onPress={props.okButtonClick}
                activeOpacity={0.7}>
                <FontText
                  size={normalize(16)}
                  name={'montserrat-semibold'}
                  color="primary"
                  textAlign="center">
                  {props.okButtonTitle}
                </FontText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LockPopup;

const styles = StyleSheet.create({
  centeredView: {
    width: wp(100),
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.popupblackbg,
  },
  modalView: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  line: {
    width: wp(90),
    height: hp(0.2),
    backgroundColor: colors.popupline,
  },
  margin: {
    marginHorizontal: wp(6),
    marginVertical: hp(3),
  },
});
