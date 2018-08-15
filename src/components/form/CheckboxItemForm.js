import _ from 'lodash';
import { Body, Icon, ListItem, Right, Text } from 'native-base';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';


class CheckboxItemForm extends PureComponent {
  constructor() {
    super();
    this.state = {
      selected: false,
    };
  }

  componentWillMount() {
    const { defaultValue } = this.props;
    if (defaultValue) this.setState({ selected: true });
  }

  markChecked() {
    const { input: { value, onChange }, checkValue } = this.props;
    if (value) {
      onChange(_.concat(value, checkValue));
    } else {
      onChange([checkValue]);
    }
    this.setState({ selected: true });
  }

  markUnchecked() {
    const { input: { value, onChange }, checkValue } = this.props;
    onChange(_.remove(value, n => n !== checkValue));
    this.setState({ selected: false });
  }

  toogle() {
    if (this.state.selected) this.markUnchecked();
    else this.markChecked();
  }

  render() {
    const { label } = this.props;
    const { selected } = this.state;

    return (
      <ListItem selected={selected} onPress={() => this.toogle()}>
        <Icon active={selected} name="checkbox" />
        <Body>
          <Text>{label}</Text>
        </Body>
        <Right />
      </ListItem>
    );
  }
}

CheckboxItemForm.propTypes = {
  input: PropTypes.object.isRequired, // eslint-disable-line
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.bool,
  checkValue: PropTypes.oneOfType(PropTypes.bool, PropTypes.string),
};

CheckboxItemForm.defaultProps = {
  defaultValue: false,
  checkValue: true,
};

export default CheckboxItemForm;
