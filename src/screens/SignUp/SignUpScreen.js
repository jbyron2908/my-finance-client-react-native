import { Button, Content, Form, Text, View } from 'native-base';
import React, { Component } from 'react';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { Field, Form as FinalForm } from 'react-final-form';
import { createStructuredSelector } from 'reselect';
import InputForm from '../../components/form/InputForm';

class SignUpComponent extends Component {
  static navigationOptions = {
    title: 'Sign Up',
  };

  render() {
    return (
      <KeyboardAwareScrollView
        enableOnAndroid
        enableAutomaticScroll
        keyboardOpeningTime={0}
        extraHeight={Platform.select({ android: 200 })}
        extraScrollHeight={Platform.select({ android: 10 })}
      >
        <Content>

          <FinalForm
            onSubmit={values => console.log(values)}
            render={({ handleSubmit }) => (
              <View>
                <Form>
                  <Field name="email" component={InputForm} label="Email" />
                  <Field name="password" component={InputForm} label="Password" secureTextEntry />
                  <Field name="passwordConfirm" component={InputForm} label="Password Confirm" secureTextEntry />
                </Form>

                <View style={{ marginTop: 10 }} flexDirection="row" justifyContent="space-around" >
                  <Button onPress={() => handleSubmit()}>
                    <Text>Sign up</Text>
                  </Button>
                </View>
              </View>
          )}
          />

        </Content>
      </KeyboardAwareScrollView>
    );
  }
}


SignUpComponent.propTypes = {
};

const mapStateToProps = createStructuredSelector({

});

const mapDispatchToProps = () => ({

});

const SignUpScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpComponent);

export default SignUpScreen;

