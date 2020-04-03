import React from 'react';
import TextInput, { TextInputProps } from '.';
import { t } from 'i18n-js';

const PasswordInput = (props: TextInputProps) => (
  <TextInput
    label={t("inputs.password")}
    autoCompleteType="off"
    returnKeyType="go"
    secureTextEntry
    textContentType="oneTimeCode"
    keyboardType="default"
    {...props}
  />
);

export default React.memo(PasswordInput);
