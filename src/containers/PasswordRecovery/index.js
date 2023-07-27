import React, { useState, useCallback, useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Keyboard } from 'react-native';
import * as authentication from '../../api/authentication';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../components/Loader';
import FontText from '../../components/FontText';
import colors from '../../assets/colors';
import { normalize, hp, wp, isX, isAndroid } from '../../helper/responsiveScreen';
import { emailValidate, passwordValidate } from '../../helper/validation';
import appConstant from '../../helper/appConstant';
import FloatingTextInput from '../../components/FloatingTextInput';
import NavigationBar from '../../components/NavigationBar';
import SvgIcons from '../../assets/SvgIcons';
import Popup from '../../components/Modal';
import { FORGOT_PASS_RESET } from '../../redux/actions/rootAction';

export const routeName = 'passwordRecovery';

const PasswordRecovery = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const inputEmail = useRef();
  const [emailAlertTxt, setemailAlertTxt] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const forgot_pass_data = useSelector(
    state => state.forgotPassReducer.forgot_pass_data,
  );
  const forgot_pass_error = useSelector(
    state => state.forgotPassReducer.forgot_pass_error,
  );
  const loading = useSelector(state => state.forgotPassReducer.loading);

  useEffect(() => {
    return () => {
      dispatch({ type: FORGOT_PASS_RESET });
    };
  }, []);

  useEffect(() => {
    if (forgot_pass_data) {
    }
  }, [forgot_pass_data]);

  useEffect(() => {
    if (forgot_pass_error) {
      alert(forgot_pass_error);
    }
  }, [forgot_pass_error]);

  ConfirmClick = () => {
    setModalVisible(true);

    const data = {
      email: email,
    };
    authentication.forgotPass(data, dispatch);
  };

  return (
    <View style={styles.container}>
      <NavigationBar
        hasCenter
        hasLeft
        hasRight
        style={{ paddingVertical: hp(1.5) }}
        left={
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.pop();
            }}>
            <SvgIcons.Back style={styles.backButton} />
          </TouchableOpacity>
        }
        right={null}
        center={
          <FontText
            size={normalize(18)}
            name={'montserrat-bold'}
            color="black"
            textAlign="center">
            {appConstant.passwordRecovery}
          </FontText>
        }
      />
      <Loader loading={loading} />
      <View style={styles.inputView}>
        <View style={styles.inputcontainer}>
          <FloatingTextInput
            attrName="email"
            title={appConstant.email}
            value={email}
            ref={inputEmail}
            keyboardType={'default'}
            returnKeyType={'done'}
            updateMasterState={(attrName, value) => {
              setEmail(value.trim());
              if (emailValidate(value)) {
                setemailAlertTxt(emailValidate(value));
                setIsButtonActive(false);
              } else {
                setemailAlertTxt(null);
                setIsButtonActive(true);
              }
            }}
            titleActiveSize={normalize(12)}
            titleInActiveSize={normalize(14)}
            titleActiveColor={colors['gray-dark']}
            titleInactiveColor={colors.gray}
            style={{ height: isAndroid ? hp(6) : hp(4) }}
            styleView={{ flex: 0.1 }}
            textInputStyles={styles.txtstyle}
            otherTextInputProps={{ maxLength: 50 }}
            iconHeight={wp(6)}
            iconWidth={wp(6)}
            blurOnSubmit={false}
            eyeIcon={false}
            onClick={() => {
              setEmail('');
              setIsButtonActive(false);
            }}
            onEndEditing={() => {
              if (emailValidate(email)) {
                setemailAlertTxt(emailValidate(email));
                setIsButtonActive(false);
              } else {
                Keyboard.dismiss();
                setemailAlertTxt(null);
                setIsButtonActive(true);
              }
            }}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
          />
          <View
            style={{
              height: 2,
              backgroundColor: emailAlertTxt == null ? colors.gray : colors.red,
            }}
          />
          {emailAlertTxt == null ? (
            <FontText
              size={normalize(10)}
              name={'montserrat-regular'}
              color="gray-dark"
              style={{ marginTop: hp(0.2) }}
              textAlign="left">
              {appConstant.emailverify}
            </FontText>
          ) : (
            <View style={{ flexDirection: 'row', marginTop: hp(0.2) }}>
              <SvgIcons.Warning
                color={colors.red}
                style={{ marginRight: hp(0.5) }}
              />
              <FontText
                size={normalize(10)}
                name={'montserrat-regular'}
                color="red"
                textAlign="center">
                {emailAlertTxt}
              </FontText>
            </View>
          )}
        </View>
      </View>
      <Popup
        header={appConstant.forgotPassword}
        message={appConstant.passwordRecoveryMsg}
        okButtonTitle={appConstant.popupButtonTxt}
        closePopup={() => {
          setModalVisible(!modalVisible);
        }}
        modalVisible={modalVisible}
        okButtonClick={() => {
          setModalVisible(!modalVisible);
        }}
      />
      <View>
        <TouchableOpacity
          onPress={() => (isButtonActive ? ConfirmClick() : null)}
          activeOpacity={isButtonActive ? 0.7 : 1}>
          <View
            style={[
              styles.btn,
              {
                backgroundColor: isButtonActive
                  ? colors.primary
                  : colors['gray-light'],
              },
            ]}>
            <FontText
              size={normalize(16)}
              name={'montserrat-semibold'}
              color={isButtonActive ? 'white' : 'gray-natural'}
              style={{ marginVertical: hp(2) }}
              textAlign="center">
              {appConstant.confirmButton}
            </FontText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: isX ? hp(4) : hp(0),
    backgroundColor: colors.white,
  },
  backButton: {
    height: hp(2),
    width: hp(2),
  },
  inputView: {
    marginHorizontal: wp(4),
  },
  inputcontainer: {
    marginTop: 20,
  },
  btn: {
    alignItems: 'center',
    backgroundColor: colors['gray-light'],
    justifyContent: 'center',
    marginHorizontal: wp(4),
    borderRadius: hp(1),
    marginTop: hp(4),
  },
  txtstyle: {
    color: colors.black,
    flex: 0.9,
    fontSize: normalize(14),
    padding: 0,
  },
});
// get the navigator passing the initial route name
export default PasswordRecovery;
