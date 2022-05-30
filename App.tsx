import React from 'react';
import { OtpInput } from './react-native-minimal-otp-input/lib';

export default function App() {
  return (
    <OtpInput
      digitCount={6}
      verifyOtp={otp => {
        console.log(`You just entered OTP ${otp}`);
      }}
    />
  );
}
