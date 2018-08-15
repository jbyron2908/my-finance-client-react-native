import aigle from 'aigle';
import _ from 'lodash';
import { Button, Content, Form, Text, View } from 'native-base';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { Field, Form as FinalForm } from 'react-final-form';
import { createStructuredSelector } from 'reselect';
import InputForm from '../../components/form/InputForm';
import { syncAction } from '../../logics/sync';
import database from '../../rxdb/database/database';

aigle.mixin(_);

class RxDBComponent extends PureComponent {
  static navigationOptions = {
    title: 'RxDB',
  };

  async getUsers() {
    console.log('getUsers');
    const db = await database.getInstance();
    const userArray = await db.users.find().exec();
    console.log(userArray);
  }

  async removeUsers() {
    console.log('removeUsers');
    const db = await database.getInstance();
    const userArray = await db.users.find().exec();
    await aigle.forEach(userArray, async (user) => {
      await user.remove();
    });
  }

  async logRxDB() {
    console.log('logRxDB');
    const db = await database.getInstance();

    console.log('users');
    const userArray = await db.users.find().exec();
    console.log(userArray);

    console.log('categories');
    const categoriesArray = await db.categories.find().exec();
    console.log(categoriesArray);

    console.log('accounts');
    const accountsArray = await db.accounts.find().exec();
    console.log(accountsArray);

    console.log('transactions');
    const transactionsArray = await db.transactions.find().exec();
    console.log(transactionsArray);
  }

  async removeRxDBDocs() {
    console.log('removeRxDBDocs');
    const db = await database.getInstance();

    const userArray = await db.users.find().exec();
    await aigle.forEach(userArray, async (user) => {
      await user.remove();
    });

    const categoryArray = await db.categories.find().exec();
    await aigle.forEach(categoryArray, async (category) => {
      await category.remove();
    });

    const accountArray = await db.accounts.find().exec();
    await aigle.forEach(accountArray, async (account) => {
      await account.remove();
    });

    const transactionArray = await db.transactions.find().exec();
    await aigle.forEach(transactionArray, async (transaction) => {
      await transaction.remove();
    });
  }

  render() {
    const { onSyncClick } = this.props;
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
            onSubmit={async ({ name }) => {
              try {
                const db = await database.getInstance();
                await db.users.insert({ name, email: `${name}@symbio.com` });
              } catch (error) {
                console.log('insert fail');
                console.log(error);
              }
            }}
            render={({ handleSubmit }) => (
              <View>
                <Form>
                  <Field name="name" component={InputForm} label="Name" />
                  <Field name="email" component={InputForm} label="Email" />
                </Form>

                <View style={{ marginTop: 10 }} flexDirection="row" justifyContent="center" >

                  <Button style={{ marginRight: 25 }} onPress={() => handleSubmit()}>
                    <Text>Create User</Text>
                  </Button>

                  <Button onPress={async () => { await this.getUsers(); }}>
                    <Text>Get Users</Text>
                  </Button>

                </View>
              </View>
          )}
          />
          <View flexDirection="row" justifyContent="center">
            <Button onPress={async () => { await this.removeUsers(); }}>
              <Text>Remove Users</Text>
            </Button>
          </View>

          <View style={{ marginTop: 10 }} flexDirection="row" justifyContent="center" >

            <Button style={{ marginRight: 25 }} onPress={() => onSyncClick()}>
              <Text>Sync</Text>
            </Button>

            <Button onPress={async () => { await this.logRxDB(); }}>
              <Text>Log RxDB</Text>
            </Button>

          </View>

          <View flexDirection="row" justifyContent="center">
            <Button onPress={async () => { await this.removeRxDBDocs(); }}>
              <Text>Remove RxDB docs</Text>
            </Button>
          </View>

        </Content>
      </KeyboardAwareScrollView>
    );
  }
}

RxDBComponent.propTypes = {
  onSyncClick: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = dispatch => ({
  onSyncClick: () => {
    dispatch(syncAction());
  },
});

const RxDBScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RxDBComponent);

export default RxDBScreen;

