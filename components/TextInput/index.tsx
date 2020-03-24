import React, { createRef } from 'react';
import {
  Animated,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import Text from '../Text';
import { Main, Margins, Colors, Typography } from '../../styles';

const baseStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: Main.FORM_INPUT_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Margins.WINDOW,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: {
    minWidth: 90,
    fontWeight: '600',
    marginRight: Margins.X,
  },
  textInput: {
    backgroundColor: Colors.LIGHT_GRAY_BG.toString(),
    flex: 1,
    fontSize: 14,
    fontFamily: Typography.MAIN_FONT_FAMILY,
    height: 40,
    paddingHorizontal: Margins.X,
  },
});

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  labelStyle?: TextStyle;
  textInputStyle?: TextStyle;
  style?: ViewStyle;
}

export default class TextInput extends React.PureComponent<TextInputProps> {
  private isFocused: Animated.AnimatedValue;

  private labelColor: Animated.AnimatedInterpolation;

  private borderBottomColor: Animated.AnimatedInterpolation;

  private textInputRef: React.RefObject<RNTextInput>;

  constructor(props: TextInputProps) {
    super(props);
    this.isFocused = new Animated.Value(0); // 0: !focused, 1: focused
    this.labelColor = this.isFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.INACTIVE_TEXT.toString(), Colors.BLUE.toString()],
    });
    this.borderBottomColor = this.isFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.BORDER.toString(), Colors.BLUE.toString()],
    });
    this.textInputRef = createRef();
  }

  handleFocus = (): void => {
    // const { onFocus } = this.props;
    Animated.timing(this.isFocused, {
      toValue: 1,
      duration: 250,
    }).start();
    // if (onFocus) onFocus({});
  };

  handleBlur = (): void => {
    // const { onBlur } = this.props;
    Animated.timing(this.isFocused, {
      toValue: 0,
      duration: 250,
    }).start();
    // if (onBlur) onBlur();
  };

  render() {
    const { label, labelStyle, style, textInputStyle, ...rest } = this.props;

    delete rest.onBlur;
    delete rest.onFocus;

    return (
      <Animated.View
        style={[baseStyles.container, { borderBottomColor: this.borderBottomColor }, style]}>
        <Text animated style={[baseStyles.label, { color: this.labelColor }, labelStyle]}>
          {label}
        </Text>
        <RNTextInput
          ref={this.textInputRef}
          style={[baseStyles.textInput, textInputStyle]}
          allowFontScaling // d
          autoCapitalize="none"
          autoCompleteType="off" // android
          autoCorrect={false}
          autoFocus={false} // d
          blurOnSubmit
          caretHidden={false} // d
          clearButtonMode="while-editing" // ios
          clearTextOnFocus={false} // ios
          contextMenuHidden={false}
          dataDetectorTypes="none" // ios
          // defaultValue={undefined}
          disableFullscreenUI={false} // android
          editable
          enablesReturnKeyAutomatically // ios
          // importantForAutofill='auto' // android TODO: add
          // inlineImageLeft={undefined} android
          // inlineImagePadding={undefined} android
          // inputAccessoryViewID={undefined} // ios
          keyboardAppearance="dark" // ios
          keyboardType="default"
          // maxFontSizeMultiplier={undefined}
          maxLength={150}
          multiline={false}
          // numberOfLines={undefined} android
          onBlur={this.handleBlur}
          // onChange={undefined}
          // onChangeText={() => {}}
          // onContentSizeChange={undefined}
          // onEndEditing={undefined}
          onFocus={this.handleFocus}
          // onKeyPress={undefined}
          // onLayout={undefined}
          // onScroll={undefined}
          // onSelectionChange={undefined}
          onSubmitEditing={undefined}
          // placeholder='Enter a text'
          placeholderTextColor={Colors.INACTIVE_TEXT.toString()}
          // returnKeyLabel='Done' // android
          returnKeyType="done"
          // rejectResponderTermination // ios TODO: add
          scrollEnabled // ios
          secureTextEntry={false}
          selectionColor={Colors.BLUE.toString()}
          // selection
          // selectionState
          selectTextOnFocus={false}
          spellCheck={false}
          textContentType="none" // ios
          textBreakStrategy="highQuality" // android
          // value
          {...rest}
        />
      </Animated.View>
    );
  }
}
