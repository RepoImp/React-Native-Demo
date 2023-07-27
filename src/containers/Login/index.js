import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import * as authentication from '../../api/authentication';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../components/Loader';
import { resetNavigateTo } from '../../helper/navigationHelper';
import { routeName as registerRouteName } from '../Register';
import { routeName as passwordRecoveryRouteName } from '../PasswordRecovery';
import FontText from '../../components/FontText';
import { normalize, hp, wp, isX, isAndroid } from '../../helper/responsiveScreen';
import NavigationBar from '../../components/NavigationBar';
import colors from '../../assets/colors';
import SvgIcons from '../../assets/SvgIcons';
import { emailValidate, passwordValidate } from '../../helper/validation';
import FloatingTextInput from '../../components/FloatingTextInput';
import appConstant from '../../helper/appConstant';
import { LOGIN_RESET } from '../../redux/actions/rootAction';
import AsyncStorage from '@react-native-community/async-storage';

export const routeName = 'login';

const Login = ({ props, navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const inputEmail = useRef();
  const inputPass = useRef();
  const [emailAlertTxt, setemailAlertTxt] = useState(null);
  const [passAlertTxt, setpassAlertTxt] = useState(null);
  const [isSecure, setIsSecure] = useState(true);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const login_data = useSelector(state => state.loginReducer.login_data);
  const login_error = useSelector(state => state.loginReducer.login_error);
  const loading = useSelector(state => state.loginReducer.loading);

  useEffect(() => { }, []);

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('loginToken', login_data.data.token);
    } catch (e) {
      console.log('Login Token error...........', e);
    }
  };

  useEffect(() => {
    if (login_data) {
      saveData();
    }
  }, [login_data]);

  useEffect(() => {
    if (login_error) {
      alert(login_error);
      dispatch({ type: LOGIN_RESET });
    }
  }, [login_error]);

  const onSignUpPress = () => {
    resetNavigateTo(navigation, registerRouteName);
  };

  LogInpress = () => {
    const data = {
      email: email,
      password: password,
    };
    authentication.login(data, dispatch);
  };

  const emailvalidation = value => {
    if (emailValidate(value)) {
      setemailAlertTxt(emailValidate(value));
      setIsButtonActive(false);
    } else {
      setemailAlertTxt(null);
      if (passAlertTxt == null && password) {
        setIsButtonActive(true);
      }
    }
  };

  const passvalidation = value => {
    if (passwordValidate(value)) {
      setpassAlertTxt(passwordValidate(value));
      setIsButtonActive(false);
    } else {
      setpassAlertTxt(null);
      if (emailAlertTxt == null) {
        setIsButtonActive(true);
      }
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      keyboardShouldPersistTaps="handled">
      <NavigationBar
        hasCenter
        style={{ paddingVertical: hp(1.5) }}
        center={
          <FontText
            size={normalize(18)}
            name={'montserrat-bold'}
            color="black"
            textAlign="center">
            {`Login`}
          </FontText>
        }
      />
      <Loader loading={loading} />
      <View style={styles.inputView}>
        <View>
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
                emailvalidation(value);
              }}
              titleActiveSize={normalize(12)}
              titleInActiveSize={normalize(14)}
              titleActiveColor={colors['gray-dark']}
              titleInactiveColor={colors.gray}
              style={{ height: isAndroid ? hp(6) : hp(4) }}
              styleView={{ flex: 0.1 }}
              textInputStyles={styles.txtinput}
              otherTextInputProps={{ maxLength: 50 }}
              iconHeight={wp(6)}
              iconWidth={wp(6)}
              blurOnSubmit={false}
              eyeIcon={false}
              onClick={() => {
                setEmail('');
                emailvalidation();
                setIsButtonActive(false);
              }}
              onEndEditing={() => {
                emailvalidation(email);
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
          <View style={styles.inputcontainer}>
            <FloatingTextInput
              attrName="password"
              title={appConstant.password}
              secureTextEntry={isSecure}
              ref={inputPass}
              value={password}
              keyboardType={'default'}
              returnKeyType={'done'}
              updateMasterState={(attrName, value) => {
                setPassword(value);
                passvalidation(value);
              }}
              titleActiveSize={normalize(12)}
              titleInActiveSize={normalize(14)}
              titleActiveColor={colors['gray-dark']}
              titleInactiveColor={colors.gray}
              style={{ height: isAndroid ? hp(6) : hp(4) }}
              styleView={{ flex: 0.2 }}
              onEndEditing={() => {
                passvalidation(password);
              }}
              textInputStyles={styles.txtinput}
              onClickShow={() => setIsSecure(true)}
              onClickHide={() => setIsSecure(false)}
              eyeShowHide={isSecure}
              otherTextInputProps={{ maxLength: 50 }}
              iconHeight={wp(6)}
              iconWidth={wp(6)}
              blurOnSubmit={false}
              eyeIcon={true}
              onClick={() => {
                setPassword('');
                passvalidation();
                setIsButtonActive(false);
              }}
              onSubmitEditing={() => {
                Keyboard.dismiss();
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
                  {passAlertTxt}
                </FontText>
              </View>
            )}
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            isButtonActive ? LogInpress() : null;
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
              {appConstant.loginWithEmail}
            </FontText>
          </View>
        </TouchableOpacity>
      </View>
      <FontText
        size={normalize(10)}
        name={'montserrat-regular'}
        color="gray-natural"
        style={{ marginHorizontal: wp(4), marginTop: hp(2) }}
        textAlign="left">
        {appConstant.termsAndConition}
        <FontText
          size={normalize(10)}
          name={'montserrat-regular'}
          color="primary"
          textAlign="left">
          {appConstant.term}
        </FontText>
        <FontText
          size={normalize(10)}
          name={'montserrat-regular'}
          color="gray-natural"
          textAlign="left">
          {appConstant.and}
        </FontText>
        <FontText
          size={normalize(10)}
          name={'montserrat-regular'}
          color="primary"
          textAlign="left">
          {appConstant.privacy}
        </FontText>
      </FontText>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(passwordRecoveryRouteName);
        }}
        activeOpacity={0.7}>
        <FontText
          size={normalize(14)}
          name={'montserrat-semibold'}
          style={{ marginHorizontal: wp(4), marginTop: hp(3) }}
          color="primary"
          textAlign="center">
          {appConstant.forgotPassword}
        </FontText>
      </TouchableOpacity>

      <FontText
        size={normalize(14)}
        name={'montserrat-semibold'}
        style={{ marginHorizontal: wp(4), marginTop: hp(3) }}
        color="gray-natural"
        textAlign="center">
        {appConstant.or}
      </FontText>
      <View>
        <TouchableOpacity onPress={() => { }} activeOpacity={0.6}>
          <View style={[styles.btnSocial, { marginTop: hp(4) }]}>
            <SvgIcons.Google />
            <FontText
              size={normalize(16)}
              name={'montserrat-semibold'}
              color="black"
              style={styles.btnText}
              textAlign="center">
              {appConstant.loginWithGoogle}
            </FontText>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => { }} activeOpacity={0.6}>
          <View style={[styles.btnSocial, { marginTop: hp(1.5) }]}>
            <SvgIcons.Telegram />
            <FontText
              size={normalize(16)}
              name={'montserrat-semibold'}
              color="black"
              style={styles.btnText}
              textAlign="center">
              {appConstant.loginWithTelegram}
            </FontText>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => { }} activeOpacity={0.6}>
          <View style={[styles.btnSocial, { marginTop: hp(1.5) }]}>
            <SvgIcons.Twitter />
            <FontText
              size={normalize(16)}
              name={'montserrat-semibold'}
              color="black"
              style={styles.btnText}
              textAlign="center">
              {appConstant.loginWithTwitter}
            </FontText>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.acc}>
        <FontText
          size={normalize(14)}
          name={'montserrat-regular'}
          color="gray-dark"
          textAlign="center">
          {appConstant.dontHaveAccount}
        </FontText>
        <TouchableOpacity
          onPress={() => {
            onSignUpPress();
          }}>
          <FontText
            size={normalize(14)}
            name={'montserrat-semibold'}
            color="primary"
            textAlign="center">
            {appConstant.signUp}
          </FontText>
        </TouchableOpacity>
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
    marginTop: 20,
  },
  btn: {
    alignItems: 'center',
    backgroundColor: colors['gray-light'],
    justifyContent: 'center',
    marginHorizontal: wp(4),
    borderRadius: hp(1),
    marginTop: hp(5),
  },

  btnSocial: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    justifyContent: 'center',
    marginHorizontal: wp(4),
    borderRadius: hp(1),
    borderColor: colors['gray-light'],
    borderWidth: wp(0.5),
  },

  btnText: {
    marginVertical: hp(2),
    marginLeft: wp(1.5),
  },
  acc: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: hp(4),
  },
  txtinput: {
    color: colors.black,
    flex: 0.9,
    fontSize: normalize(14),
    padding: 0,
  },
});
export default Login;
