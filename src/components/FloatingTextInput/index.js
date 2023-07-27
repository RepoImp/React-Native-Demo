import React, {Component} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {string, func, object, number, bool} from 'prop-types';
import PropTypes from 'prop-types';
import {hp, normalize, wp} from '../../helper/responsiveScreen';
import SvgIcons from '../../assets/SvgIcons';
import fonts from '../../assets/fonts';

class FloatingTextInput extends Component {
  static propTypes = {
    attrName: string.isRequired,
    title: string.isRequired,
    value: string,
    updateMasterState: func.isRequired,
    keyboardType: string,
    secureTextEntry: bool.isRequired,
    titleActiveSize: number, // to control size of title when field is active
    titleInActiveSize: number, // to control size of title when field is inactive
    titleActiveColor: string, // to control color of title when field is active
    titleInactiveColor: string, // to control color of title when field is active
    textInputStyles: object,
    titleStyle: object,
    otherTextInputProps: object,
    height: number,
    style: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    // button: false,
    iconHeight: number,
    iconWidth: number,
    iconScale: number,
    resizeMode: PropTypes.string,
    iconStyle: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    returnKeyType: PropTypes.string,
    onClick: PropTypes.func,
    clearOnSubmit: PropTypes.bool,
    blurOnSubmit: PropTypes.bool,
    multiline: PropTypes.bool,
    multilineHeight: PropTypes.number,
    onFocus: PropTypes.func,
    autoFocus: PropTypes.bool,
    onEndEditing: PropTypes.func,
  };

  static defaultProps = {
    keyboardType: 'default',
    titleActiveSize: 11.5,
    titleInActiveSize: 15,
    titleActiveColor: 'black',
    titleInactiveColor: 'dimgrey',
    textInputStyles: {},
    otherTextInputAttributes: {},
    clearOnSubmit: false,
    multiline: false,
    multilineHeight: 120,
    secureTextEntry: false,
    onFocus: null,
    autoFocus: false,
  };

  constructor(props) {
    super(props);
    const {value} = this.props;
    this.position = new Animated.Value(value ? 1 : 0);
    this.state = {
      isFieldActive: false,
      value: '',
    };
  }

  _handleFocus = () => {
    if (!this.state.isFieldActive) {
      this.setState({isFieldActive: true});
      Animated.timing(this.position, {
        toValue: 1,
        duration: 150,
      }).start();
    }
  };

  _handleBlur = () => {
    if (this.state.isFieldActive && !this.props.value) {
      this.setState({isFieldActive: false});
      Animated.timing(this.position, {
        toValue: 0,
        duration: 150,
      }).start();
    }
  };

  _onChangeText = updatedValue => {
    const {attrName, updateMasterState} = this.props;
    updateMasterState(attrName, updatedValue);
  };

  _returnAnimatedTitleStyles = () => {
    const {isFieldActive} = this.state;
    const {
      titleActiveColor,
      titleInactiveColor,
      titleActiveSize,
      titleInActiveSize,
    } = this.props;

    return {
      top: this.position.interpolate({
        inputRange: [0, 0.4],
        outputRange: [6, 0],
      }),
      fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
      color: isFieldActive ? titleActiveColor : titleInactiveColor,
    };
  };

  focus = () => this.input && this.input.focus();

  blur = () => this.input && this.input.blur();

  render() {
    const {
      style,
      returnKeyType,
      blurOnSubmit,
      multiline,
      autoFocus,
      onSubmitEditing,
      styleView,
    } = this.props;
    return (
      <View style={[Styles.wrapper, style]}>
        <Animated.Text
          style={[
            Styles.titleStyles,
            this.props.titleStyle,
            this._returnAnimatedTitleStyles(),
          ]}>
          {this.props.title}
        </Animated.Text>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
          }}>
          {this.props.searchIcon === true ? (
            <View style={Styles.iconViewleft}>
              <TouchableOpacity activeOpacity={1}>
                <SvgIcons.SearchInput
                  height={this.props.searchIconHeight}
                  width={this.props.searchIconWidth}
                  style={[this.props.iconStyle, Styles.icon]}
                  scale={this.props.iconScale}
                  resizeMode={this.props.resizeMode}
                />
              </TouchableOpacity>
            </View>
          ) : null}

          <TextInput
            textContentType="oneTimeCode"
            ref={r => (this.input = r)}
            value={this.props.value}
            style={[Styles.textInput, this.props.textInputStyles]}
            underlineColorAndroid="transparent"
            onFocus={this._handleFocus}
            onBlur={this._handleBlur}
            returnKeyType={returnKeyType}
            onChangeText={this._onChangeText}
            keyboardType={this.props.keyboardType}
            {...this.props.otherTextInputProps}
            onEndEditing={this.props.onEndEditing}
            secureTextEntry={this.props.secureTextEntry}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={multiline ? false : blurOnSubmit}
            autoFocus={autoFocus}
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholder={this.props.placeholder}
          />

          {this.props.eyeIcon === true ? (
            <View style={[Styles.iconView, styleView]}>
              {this.props.value?.length > 0 ? (
                <TouchableOpacity onPress={this.props.onClick}>
                  <SvgIcons.Close
                    height={this.props.iconHeight}
                    width={this.props.iconWidth}
                    style={[this.props.iconStyle, Styles.icon]}
                    scale={this.props.iconScale}
                    resizeMode={this.props.resizeMode}
                  />
                </TouchableOpacity>
              ) : null}

              {this.props.eyeShowHide === true ? (
                <TouchableOpacity
                  onPress={this.props.onClickHide}
                  style={{marginLeft: hp(1)}}>
                  <SvgIcons.Hide
                    height={this.props.iconHeight}
                    width={this.props.iconWidth}
                    style={[this.props.iconStyle, Styles.icon]}
                    scale={this.props.iconScale}
                    resizeMode={this.props.resizeMode}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={this.props.onClickShow}
                  style={{marginLeft: hp(1)}}>
                  <SvgIcons.Show
                    height={this.props.iconHeight}
                    width={this.props.iconWidth}
                    style={[this.props.iconStyle, Styles.icon]}
                    scale={this.props.iconScale}
                    resizeMode={this.props.resizeMode}
                  />
                </TouchableOpacity>
              )}
            </View>
          ) : this.props.value?.length > 0 ? (
            <View style={[Styles.iconView, styleView]}>
              <TouchableOpacity onPress={this.props.onClick}>
                <SvgIcons.Close
                  height={this.props.iconHeight}
                  width={this.props.iconWidth}
                  style={[this.props.iconStyle, Styles.icon]}
                  scale={this.props.iconScale}
                  resizeMode={this.props.resizeMode}
                />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
  },
  textInput: {
    fontFamily: fonts['montserrat-regular'],
    color: 'black',
  },
  titleStyles: {
    position: 'absolute',
    fontFamily: fonts['montserrat-regular'],
  },
  icon: {},
  iconView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconViewleft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: wp(3),
  },
});

export default FloatingTextInput;
