import Constant from './appConstant';

export function emailValidate(email) {
  let emailErr;
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(email) === true) {
    emailErr = null;
  } else if (email === '' || email === null) {
    emailErr = Constant.emailRequire;
  } else {
    emailErr = Constant.validEmail;
  }
  return emailErr;
}
export function passwordValidate(password) {
  let passErr;
  const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');
  if (strongRegex.test(password) === true) {
    passErr = null;
  } else if (password === '' || password === null) {
    passErr = Constant.passwordRequire;
  } else {
    passErr = Constant.validpassword;
  }
  return passErr;
}

export function nickNameValidate(nickName) {
  let nameErr;
  if (nickName === '' || nickName === null) {
    nameErr = Constant.nameRequire;
  } else {
    nameErr = null;
  }
  return nameErr;
}

export function confirmPasswordValidate(password, confirmPassword) {
  let confpass;
  if (confirmPassword === null || confirmPassword === '') {
    confpass = Constant.confirmPasswordErr;
  } else if (password !== confirmPassword) {
    confpass = Constant.passwrodMatchErr;
  } else {
    confpass = null;
  }
  return confpass;
}
export function refferalCodeValidate(refferal) {
  let refErr;
  if (refferal === null || refferal === '') {
    refErr = Constant.refAlertText;
  } else {
    refErr = null;
  }
  return refErr;
}

export function emailCodeValidate(emailCode) {
  let emailCodeErr;
  if (emailCode === null || emailCode === '') {
    emailCodeErr = Constant.emailcodealert;
  } else {
    emailCodeErr = null;
  }
  return emailCodeErr;
}
