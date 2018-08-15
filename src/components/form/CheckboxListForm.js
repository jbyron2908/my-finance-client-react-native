import _ from 'lodash';
import { List } from 'native-base';
import React from 'react';
import PropTypes from 'prop-types';
import CheckboxItemForm from './CheckboxItemForm';

const CheckboxListForm = (props) => {
  const {
    data,
    input: { value, onChange },
  } = props;

  return (
    <List>

      {_.map(data, (item) => {
        const { label, value: itemValue } = item;
        return (
          <CheckboxItemForm
            label={label}
            checkValue={itemValue}
            onChange={onChange}
            value={value}
          />
          );
        })
      }

    </List>
  );
};

/* eslint-disable */
CheckboxListForm.propTypes = {
  data: PropTypes.array.isRequired,
  input: PropTypes.object.isRequired,
};
/* eslint-enable */

export default CheckboxListForm;
