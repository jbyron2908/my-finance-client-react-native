import React, { Component } from 'react';
import { Item, Input, Text, Label } from 'native-base';
import { FieldRenderProps } from 'react-final-form';
import PropTypes from 'prop-types';


class InputForm extends Component {
  render() {
    const {
      input, label, secureTextEntry, meta: { error },
    } = this.props;

    let hasError = false;
    if (error !== undefined) {
      hasError = true;
    }

    return (
      <Item stackedLabel error={hasError}>
        <Label>{label}</Label>
        <Input {...input} secureTextEntry={secureTextEntry} />
        {(hasError) ? <Text>{error}</Text> : <Text />}
      </Item>
    );
  }
}

InputForm.propTypes = {
  ...FieldRenderProps,
  secureTextEntry: PropTypes.bool,
};

InputForm.defaultProps = {
  secureTextEntry: false,
};

export default InputForm;
