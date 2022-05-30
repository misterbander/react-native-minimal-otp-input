import React, { useEffect, useMemo, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableWithoutFeedback,
  View
} from 'react-native';

export function OtpInput(props: OtpInputProps) {
  const { digitCount, textInputStyle, verifyOtp } = props;

  // Current input digits as a string, if the string matches the OTP string, then it is considered a match
  const [inputDigits, setInputDigits] = useState('');
  // Reference to all the OTP text fields
  const textFields: TextInput[] | null[] = useMemo(() => [], []);

  useEffect(() => {
    // Focus the next empty text field
    textFields[inputDigits.length]?.focus();

    if (inputDigits.length === digitCount) {
      verifyOtp(inputDigits);
    }
  }, [digitCount, verifyOtp, textFields, inputDigits]);

  return (
    <View>
      <TouchableWithoutFeedback style={{ width: '100%', height: '100%' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: '100%'
          }}>
          {[...Array(digitCount)].map((_, index) => (
            <View key={'View' + index}>
              <TextInput
                underlineColorAndroid="rgba(0,0,0,0)"
                style={textInputStyle ?? styles.defaultTextInputStyle}
                ref={ref => {
                  textFields[index] = ref; // Set text field references
                }}
                value={inputDigits[index] ?? ''}
                maxLength={1}
                keyboardType="number-pad"
                onKeyPress={({ nativeEvent: { key } }) => {
                  if (key === 'Backspace') {
                    setInputDigits(
                      inputDigits.slice(0, inputDigits.length - 1)
                    ); // Remove the last input digit
                  }
                }}
                onChangeText={text => {
                  text = text.replace(/[^0-9]/g, '');
                  setInputDigits(inputDigits + text);
                }}
              />
            </View>
          ))}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create<{
  defaultTextInputStyle: TextStyle;
}>({
  defaultTextInputStyle: {
    width: 45,
    height: 45,
    borderColor: 'rgba(226, 226, 226, 1)',
    borderWidth: 1,
    borderRadius: 2,
    textAlign: 'center',
    color: 'rgba(90, 90, 90, 1)'
  }
});

export interface OtpInputProps {
  /** The number of digits in the OTP. */
  digitCount: number;
  /** Custom style for the OTP input boxes. If omitted, then a default one will be supplied.  */
  textInputStyle?: TextStyle;
  /**
   * Function that will be called when all OTP boxes are filled. Can be used to verify if the input
   * OTP is correct.
   */
  verifyOtp: (otp: string) => void;
}
