/*
Login modal for settings
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Platform,
  StyleSheet,
  Linking,
  Image,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { getImage, getSizeByWidth, getFontSize } from '../services/graphics';
import { toggleIsLoading } from '../state/SessionState';
import { post } from '../utils/api';
import AppButton from '../components/AppButton';
import { setAuthenticationToken } from '../utils/authentication';

const privacyPolicyURL =
  'https://spiceprogram.org/assets/docs/privacy-policy-hemmo.txt';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: null,
    width: null,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  loginContainer: {
    backgroundColor: '#fff',
    paddingTop: getFontSize(2.5),
    paddingBottom: getFontSize(4),
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
  },
  scrollContainer: {},
  formField: {
    marginLeft: getFontSize(7),
    marginRight: getFontSize(7),
    ...Platform.select({
      ios: {
        paddingBottom: getFontSize(2),
      },
    }),
  },
  inputView: {
    ...Platform.select({
      ios: {
        borderBottomWidth: 2,
      },
    }),
  },
  input: {
    textAlign: 'center',
    fontSize: getFontSize(2),
    fontFamily: 'Roboto-Regular',
    ...Platform.select({
      ios: {
        height: getFontSize(5),
      },
    }),
  },
  label: {
    textAlign: 'center',
    color: '#000',
    fontFamily: 'Roboto-Medium',
    margin: getFontSize(1.5),
    fontSize: getFontSize(2),
  },
  privacyPolicy: {
    marginTop: getFontSize(3),
    fontSize: getFontSize(2),
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
  loginButton: {
    alignSelf: 'center',
    margin: getFontSize(3),
  },
  loginText: {
    flex: 1,
    margin: getFontSize(3),
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: getFontSize(2),
    color: '#000',
  },
  header: {
    backgroundColor: '#fff',
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
    height: getFontSize(8),
  },
  headerTitle: {
    alignSelf: 'center',
    fontSize: getFontSize(3),
  },
});

const mapDispatchToProps = dispatch => ({
  onSuccess: () =>
    dispatch(
      NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' }),
          NavigationActions.navigate({ routeName: 'Settings' }),
        ],
      }),
    ),
  toggleIsLoading: loading => dispatch(toggleIsLoading(loading)),
});

@connect(undefined, mapDispatchToProps)
export default class LoginViewContainer extends Component {
  static navigationOptions = {
    title: 'Kirjaudu sisään',
    headerRight: <View />, // Needed for a centered title
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
  };

  static propTypes = {
    onSuccess: PropTypes.func.isRequired,
    toggleIsLoading: PropTypes.func.isRequired,
  };

  state = {
    email: __DEV__ ? 'foo@bar.com' : '',
    password: __DEV__ ? 'foobar' : '',
  };

  openPrivacyPolicy = () => {
    Linking.openURL(privacyPolicyURL).catch(err =>
      console.error('An error occurred', err),
    );
  };

  verifyPassword = async () => {
    this.props.toggleIsLoading(true);

    try {
      const result = await post('/admin/employees/authenticate', {
        email: this.state.email,
        password: this.state.password,
      });

      this.props.toggleIsLoading(false);
      await setAuthenticationToken(result.token);
      this.props.onSuccess();
    } catch (error) {
      console.log(error);
      this.props.toggleIsLoading(false);

      if (error.status) {
        Alert.alert(
          'Virhe sisäänkirjautumisessa!',
          'Tarkista sähköposti ja salasana.',
        );
      } else {
        Alert.alert(
          'Yhteyttä palvelimelle ei voitu muodostaa!',
          'Tarkista nettiyhteytesi tai yritä myöhemmin uudelleen.',
        );
      }
    }
  };

  renderEmailField = () =>
    <View style={styles.formField}>
      <Text style={styles.label}>Sähköpostiosoite</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          keyboardType={'email-address'}
          onChangeText={email => this.setState({ email: email.toLowerCase() })}
          value={this.state.email}
          secureTextEntry={false}
        />
      </View>
    </View>;

  renderPasswordField = () =>
    <View style={styles.formField}>
      <Text style={styles.label}>Salasana</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          keyboardType={'default'}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          secureTextEntry
        />
      </View>
    </View>;

  renderLoginButton = () =>
    <View style={styles.loginButton}>
      <AppButton
        onPress={this.verifyPassword}
        contentContainerStyle={{ padding: 10 }}
        background="button_small"
        width={getSizeByWidth('button_small', 0.45).width}
        shadow
      >
        <Text style={styles.loginText}>Kirjaudu</Text>
      </AppButton>
    </View>;

  renderPrivacyPolicyLink = () =>
    <Text style={styles.privacyPolicy} onPress={this.openPrivacyPolicy}>
      Tietosuojakäytäntö
    </Text>;

  render() {
    return (
      <Image source={getImage('forest').normal} style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={styles.scrollContainer}
          overScrollMode={'always'}
        >
          <View style={styles.loginContainer}>
            {this.renderEmailField()}
            {this.renderPasswordField()}
            {this.renderLoginButton()}
            {this.renderPrivacyPolicyLink()}
          </View>
        </ScrollView>
      </Image>
    );
  }
}
