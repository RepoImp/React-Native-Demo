import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Platform, Animated} from 'react-native';
import colors from '../../assets/colors';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {wp, hp, normalize} from '../../helper/responsiveScreen';

export const navbarXSpace = isIphoneX() ? hp(1) : 0;
export const navbarHeight = Platform.OS === 'ios' ? hp(5) : hp(8.5);

const NavigationBar = ({
  height,
  style,
  isFixed,
  hairline,
  hairlineColor,
  bgColor,
  left,
  hasLeft,
  right,
  hasRight,
  center,
  hasCenter,
  leftStyle,
  centerStyle,
  rightStyle,
  sidesWidth,
  animated,
}) => {
  const _wrapperStyle = {
    height: height + navbarXSpace,
  };
  const _sideStyle = {
    width: sidesWidth,
  };
  hairlineColor =
    typeof hairlineColor === 'string'
      ? {borderColor: colors[hairlineColor]}
      : hairlineColor;
  bgColor =
    typeof bgColor === 'string' ? {backgroundColor: colors[bgColor]} : bgColor;

  if (animated) {
    return (
      <Animated.View
        style={[
          styles.wrapper,
          isFixed ? styles.wrapperFixed : null,
          hairline ? styles.withHairline : null,
          hairlineColor,
          bgColor,
          styles.wrapper,
          style,
        ]}>
        {hasLeft ? (
          <View style={[styles.left, _sideStyle, leftStyle]}>{left}</View>
        ) : null}
        {hasCenter ? (
          <View style={[styles.center, centerStyle]}>{center}</View>
        ) : null}
        {hasRight ? (
          <View style={[styles.right, _sideStyle, rightStyle]}>{right}</View>
        ) : null}
      </Animated.View>
    );
  }

  return (
    <View
      style={[
        styles.wrapper,
        isFixed ? styles.wrapperFixed : null,
        hairline ? styles.withHairline : null,
        hairlineColor,
        bgColor,
        styles.wrapper,
        style,
      ]}>
      {hasLeft ? (
        <View style={[styles.left, _sideStyle, leftStyle]}>{left}</View>
      ) : null}
      {hasCenter ? (
        <View style={[styles.center, centerStyle]}>{center}</View>
      ) : null}
      {hasRight ? (
        <View style={[styles.right, _sideStyle, rightStyle]}>{right}</View>
      ) : null}
    </View>
  );
};

NavigationBar.defaultProps = {
  height: navbarHeight,
  isFixed: false,
  hairline: true,
  hairlineColor: null,
  bgColor: 'theme',
  hasLeft: false,
  hasCenter: false,
  hasRight: false,
  left: null,
  center: null,
  right: null,
  sidesWidth: 88,
  animated: false,
};

NavigationBar.propTypes = {
  height: PropTypes.number,
  isFixed: PropTypes.bool,
  hairline: PropTypes.bool,
  hairlineColor: PropTypes.string,
  bgColor: PropTypes.string,
  left: PropTypes.node,
  center: PropTypes.node,
  right: PropTypes.node,
  leftStyle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.arrayOf(PropTypes.object),
  ]),
  centerStyle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.arrayOf(PropTypes.object),
  ]),
  rightStyle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.arrayOf(PropTypes.object),
  ]),
  style: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.arrayOf(PropTypes.object),
  ]),
  sidesWidth: PropTypes.number,
  animated: PropTypes.bool,
};

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: NavigationBar.height,
  },
  wrapperFixed: {
    top: 0,
    left: 0,
    width: '100%',
    position: 'absolute',
  },
  withHairline: {},
  left: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: hp(2),
  },
  center: {
    width: 0,
    flexGrow: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: hp(2),
  },
});

export default NavigationBar;
