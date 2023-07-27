import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../components/Loader';
import FontText from '../../components/FontText';
import * as authentication from '../../api/authentication';
import colors from '../../assets/colors';
import { normalize, hp, wp, isX, isAndroid } from '../../helper/responsiveScreen';
import {
  emailValidate,
  passwordValidate,
  nickNameValidate,
  confirmPasswordValidate,
} from '../../helper/validation';
import appConstant from '../../helper/appConstant';
import FloatingTextInput from '../../components/FloatingTextInput';
import NavigationBar from '../../components/NavigationBar';
import SvgIcons from '../../assets/SvgIcons';
import { REGISTER_RESET } from '../../redux/actions/rootAction';

export const routeName = 'register';

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const [nickName, setNickName] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [emailAlertTxt, setemailAlertTxt] = useState(null);
  const [passAlertTxt, setpassAlertTxt] = useState(null);
  const [nickNameAlert, setNickNameAlert] = useState(null);
  const [confirmPasswordAlert, setConfirmPasswordAlert] = useState(null);
  const [isSecure, setIsSecure] = useState(true);
  const [isSecureConf, setIsSecureConf] = useState(true);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const inputNickName = useRef();
  const inputEmail = useRef();
  const inputPass = useRef();
  const inputConfirmPass = useRef();

  const register_data = useSelector(
    state => state.registerReducer.register_data,
  );
  const register_error = useSelector(
    state => state.registerReducer.register_error,
  );
  const loading = useSelector(state => state.registerReducer.loading);

  useEffect(() => {
    console.log(' register data', register_data);
  }, [register_data]);

  useEffect(() => {
    if (register_error) {
      alert(register_error);
      dispatch({ type: REGISTER_RESET });
    }
  }, [register_error]);

  RegisterClick = () => {
    const data = {
      nickname: nickName,
      email: email,
      password: password,
    };
    authentication.register(data, dispatch);
  };

  const emailValidation = value => {
    if (emailValidate(value)) {
      setemailAlertTxt(emailValidate(value));
      setIsButtonActive(false);
    } else {
      setemailAlertTxt(null);
      if (
        nickNameAlert == null &&
        nickName &&
        passAlertTxt == null &&
        password &&
        confirmPasswordAlert == null &&
        confirmPassword
      ) {
        setIsButtonActive(true);
      }
    }
  };
  const nickNameValidation = value => {
    if (nickNameValidate(value)) {
      setNickNameAlert(nickNameValidate(value));
      setIsButtonActive(false);
    } else {
      setNickNameAlert(null);
      if (
        emailAlertTxt == null &&
        email &&
        passAlertTxt == null &&
        password &&
        confirmPasswordAlert == null &&
        confirmPassword
      ) {
        setIsButtonActive(true);
      }
    }
  };
  const passValidation = value => {
    if (passwordValidate(value)) {
      setpassAlertTxt(passwordValidate(value));
      setIsButtonActive(false);
    } else {
      setpassAlertTxt(null);
      if (
        nickNameAlert == null &&
        nickName &&
        emailAlertTxt == null &&
        email &&
        confirmPasswordAlert == null &&
        confirmPassword
      ) {
        setIsButtonActive(true);
      }
    }
  };
  const confPassValidation = (value, password) => {
    if (confirmPasswordValidate(password, value)) {
      setConfirmPasswordAlert(confirmPasswordValidate(password, value));
      setIsButtonActive(false);
    } else {
      Keyboard.dismiss();
      setConfirmPasswordAlert(null);
      if (
        nickNameAlert == null &&
        nickName &&
        emailAlertTxt == null &&
        email &&
        passAlertTxt == null &&
        password
      ) {
        setIsButtonActive(true);
      }
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <NavigationBar
          hasCenter
          style={{ paddingVertical: hp(1.5) }}
          center={
            <FontText
              size={normalize(18)}
              name={'montserrat-bold'}
              color="black"
              textAlign="center">{`Register`}</FontText>
          }
        />
        <Loader loading={loading} />
        <View style={styles.inputView}>
          <View>
            <View style={styles.inputcontainer}>
              <FloatingTextInput
                attrName="nickname"
                title={appConstant.nickName}
                value={nickName}
                ref={inputNickName}
                keyboardType={'default'}
                returnKeyType={'next'}
                updateMasterState={(attrName, value) => {
                  setNickName(value);
                  nickNameValidation(value);
                }}
                titleActiveSize={normalize(12)}
                titleInActiveSize={normalize(14)}
                titleActiveColor={colors['gray-dark']}
                titleInactiveColor={colors.gray}
                style={{ height: isAndroid ? hp(6) : hp(4) }}
                styleView={{ flex: 0.1 }}
                textInputStyles={{
                  // here you can add additional TextInput styles
                  color: colors.black,
                  flex: 0.9,
                  fontSize: normalize(14),
                  padding: 0,
                }}
                otherTextInputProps={{
                  // here you can add other TextInput props of your choice
                  maxLength: 50,
                }}
                iconHeight={wp(6)}
                iconWidth={wp(6)}
                blurOnSubmit={false}
                eyeIcon={false}
                onClick={() => {
                  setNickName('');
                  nickNameValidation();
                  setIsButtonActive(false);
                }}
                onEndEditing={() => {
                  nickNameValidation(nickName);
                }}
                onSubmitEditing={() => {
                  inputEmail.current.focus();
                }}
              />

              <View
                style={{
                  height: 2,
                  backgroundColor:
                    nickNameAlert == null ? colors.gray : colors.red,
                }}
              />

              {nickNameAlert == null ? (
                <FontText
                  size={normalize(10)}
                  name={'montserrat-regular'}
                  color="gray-dark"
                  textAlign="left">
                  {appConstant.nickNameTerms}
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
                    {nickNameAlert}
                  </FontText>
                </View>
              )}
            </View>

            <View style={styles.inputcontainer}>
              <FloatingTextInput
                attrName="email"
                title={appConstant.email}
                value={email}
                ref={inputEmail}
                keyboardType={'default'}
                returnKeyType={'next'}
                updateMasterState={(attrName, value) => {
                  setEmail(value.trim());
                  emailValidation(value);
                }}
                titleActiveSize={normalize(12)}
                titleInActiveSize={normalize(14)}
                titleActiveColor={colors['gray-dark']}
                titleInactiveColor={colors.gray}
                style={{ height: isAndroid ? hp(6) : hp(4) }}
                styleView={{ flex: 0.1 }}
                textInputStyles={{
                  // here you can add additional TextInput styles
                  color: colors.black,
                  flex: 0.9,
                  fontSize: normalize(14),
                  padding: 0,
                }}
                otherTextInputProps={{
                  // here you can add other TextInput props of your choice
                  maxLength: 50,
                }}
                iconHeight={wp(6)}
                iconWidth={wp(6)}
                blurOnSubmit={false}
                eyeIcon={false}
                onClick={() => {
                  setEmail('');
                  emailValidation();
                  setIsButtonActive(false);
                }}
                onEndEditing={() => {
                  emailValidation(email);
                }}
                onSubmitEditing={() => {
                  inputPass.current.focus();
                }}
              />

              <View
                style={{
                  height: 2,
                  backgroundColor:
                    emailAlertTxt == null ? colors.gray : colors.red,
                }}
              />

              {emailAlertTxt == null ? null : (
                <View style={styles.row}>
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

            <View style={styles.inputcontainer}>
              <FloatingTextInput
                attrName="password"
                title={appConstant.password}
                secureTextEntry={isSecure}
                ref={inputPass}
                value={password}
                keyboardType={'default'}
                returnKeyType={'next'}
                updateMasterState={(attrName, value) => {
                  setPassword(value);
                  passValidation(value);
                }}
                titleActiveSize={normalize(12)}
                titleInActiveSize={normalize(14)}
                titleActiveColor={colors['gray-dark']}
                titleInactiveColor={colors.gray}
                style={{ height: isAndroid ? hp(6) : hp(4) }}
                styleView={{ flex: 0.2 }}
                textInputStyles={{
                  // here you can add additional TextInput styles
                  color: colors.black,
                  flex: 0.8,
                  fontSize: normalize(14),
                  padding: 0,
                }}
                onClickShow={() => setIsSecure(true)}
                onClickHide={() => setIsSecure(false)}
                eyeShowHide={isSecure}
                otherTextInputProps={{
                  // here you can add other TextInput props of your choice
                  maxLength: 50,
                }}
                iconHeight={wp(6)}
                iconWidth={wp(6)}
                blurOnSubmit={false}
                eyeIcon={true}
                onClick={() => {
                  setPassword('');
                  passValidation();
                  setIsButtonActive(false);
                }}
                onEndEditing={() => {
                  passValidation(password);
                }}
                onSubmitEditing={() => {
                  inputConfirmPass.current.focus();
                }}
              />
              <View
                style={{
                  height: 2,
                  backgroundColor:
                    passAlertTxt == null ? colors.gray : colors.red,
                }}
              />

              {passAlertTxt == null ? null : (
                <View style={styles.row}>
                  <SvgIcons.Warning
                    color={colors.red}
                    style={{ marginRight: hp(0.5) }}
                  />
                  <FontText
                    size={normalize(10)}
                    name={'montserrat-regular'}
                    color="red"
                    textAlign="center">
                    {passAlertTxt}
                  </FontText>
                </View>
              )}
            </View>

            <View style={styles.inputcontainer}>
              <FloatingTextInput
                attrName="confirmpassword"
                title={appConstant.confirmPassword}
                secureTextEntry={isSecureConf}
                ref={inputConfirmPass}
                value={confirmPassword}
                keyboardType={'default'}
                returnKeyType={'done'}
                updateMasterState={(attrName, value) => {
                  setConfirmPassword(value);
                  confPassValidation(value, password);
                }}
                titleActiveSize={normalize(12)}
                titleInActiveSize={normalize(14)}
                titleActiveColor={colors['gray-dark']}
                titleInactiveColor={colors.gray}
                style={{ height: isAndroid ? hp(6) : hp(4) }}
                styleView={{ flex: 0.2 }}
                textInputStyles={{
                  // here you can add additional TextInput styles
                  color: colors.black,
                  flex: 0.8,
                  fontSize: normalize(14),
                  padding: 0,
                }}
                onClickShow={() => setIsSecureConf(true)}
                onClickHide={() => setIsSecureConf(false)}
                eyeShowHide={isSecureConf}
                otherTextInputProps={{
                  // here you can add other TextInput props of your choice
                  maxLength: 50,
                }}
                iconHeight={wp(6)}
                iconWidth={wp(6)}
                blurOnSubmit={false}
                eyeIcon={true}
                onClick={() => {
                  setConfirmPassword('');
                  confPassValidation(password, confirmPassword);
                  setIsButtonActive(false);
                }}
                onEndEditing={() => {
                  confPassValidation(password, confirmPassword);
                }}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
              />
              <View
                style={{
                  height: 2,
                  backgroundColor:
                    confirmPasswordAlert == null ? colors.gray : colors.red,
                }}
              />

              {confirmPasswordAlert == null ? null : (
                <View style={styles.row}>
                  <SvgIcons.Warning
                    color={colors.red}
                    style={{ marginRight: hp(0.5) }}
                  />
                  <FontText
                    size={normalize(10)}
                    name={'montserrat-regular'}
                    color="red"
                    textAlign="center">
                    {confirmPasswordAlert}
                  </FontText>
                </View>
              )}
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              isButtonActive ? RegisterClick() : null;
            }}
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
                {appConstant.register}
              </FontText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: isX ? hp(4) : hp(0),
    backgroundColor: colors.white,
  },
  inputView: {
    marginHorizontal: wp(4),
  },
  inputcontainer: {
    marginTop: hp(5),
  },
  btn: {
    alignItems: 'center',
    backgroundColor: colors['gray-light'],
    justifyContent: 'center',
    marginHorizontal: wp(4),
    borderRadius: hp(1),
    marginTop: hp(5),
  },
  row: {
    flexDirection: 'row',
    marginTop: hp(0.2),
  },
});
// get the navigator passing the initial route name
export default Register;
