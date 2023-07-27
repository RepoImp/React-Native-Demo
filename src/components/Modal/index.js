import React, {useState} from 'react';
import {View, TouchableOpacity, Modal, StyleSheet, Image} from 'react-native';
import FontText from '../../components/FontText';
import colors from '../../assets/colors';
import {normalize, hp, wp, isX, isAndroid} from '../../helper/responsiveScreen';

const Popup = props => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.modalVisible}
      // onRequestClose={props.closePopup}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {props.imgProfile ? (
            <Image source={props.imgurl} style={[styles.img, props.imgStyle]} />
          ) : null}
          <View style={styles.margin}>
            <FontText
              size={normalize(20)}
              name={'montserrat-bold'}
              color="black"
              style={styles.modalText}
              textAlign="center">
              {props.header}
            </FontText>

            <View style={{marginTop: hp(1)}}>
              <FontText
                size={normalize(14)}
                name={'montserrat-regular'}
                color="black"
                textAlign="center">
                {props.message}
              </FontText>
              {props.message2 ? (
                <FontText
                  size={normalize(14)}
                  name={'montserrat-regular'}
                  color="black"
                  pTop={hp(1.5)}
                  textAlign="center">
                  {props.message2}
                </FontText>
              ) : null}
            </View>
          </View>
          {props.twoButton == true ? (
            <View>
              <View style={styles.btnview} />
              <View style={{marginVertical: hp(2)}}>
                <TouchableOpacity
                  onPress={props.okButtonClick}
                  activeOpacity={0.7}>
                  <FontText
                    size={normalize(16)}
                    name={'montserrat-semibold'}
                    color={props?.titleColor ? 'red' : 'primary'}
                    textAlign="center">
                    {props.okButtonTitle}
                  </FontText>
                </TouchableOpacity>
              </View>

              <View style={styles.line}></View>
              <View style={{marginVertical: hp(2)}}>
                <TouchableOpacity
                  onPress={props.cancelButtonClick}
                  activeOpacity={0.7}>
                  <FontText
                    size={normalize(16)}
                    name={'montserrat-semibold'}
                    color="gray-dark"
                    textAlign="center">
                    {props.cancelButtonTitle}
                  </FontText>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              <View style={styles.line}></View>
              <View style={{marginVertical: hp(2)}}>
                <TouchableOpacity
                  onPress={() => props.okButtonClick}
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
          )}
        </View>
      </View>
    </Modal>
  );
};

export default Popup;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.popupblackbg,
  },
  modalView: {
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
  img: {
    width: wp(14),
    height: wp(14),
    marginTop: hp(3),
    marginBottom: hp(-1),
  },
  btnview: {
    width: wp(90),
    height: hp(0.1),
    backgroundColor: colors.popupline,
  },
  line: {
    width: wp(90),
    height: hp(0.1),
    backgroundColor: colors.popupline,
  },
  margin: {
    marginHorizontal: wp(6),
    marginVertical: hp(3),
  },
});
