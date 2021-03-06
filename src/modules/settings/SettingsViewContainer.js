import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import {
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Text,
  TextInput,
  View,
  Platform,
  StyleSheet,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { showSaveModal, toggleIsLoading } from '../../state/SessionState';
import AppButton from '../../components/AppButton';
import { createUser, editUser, removeUser } from '../../state/UserState';
import { post } from '../../utils/api';
import { getSizeByWidth, getImage, getFontSize } from '../../services/graphics';

const iconSize = getSizeByWidth('profilephoto', 0.4).width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    flexDirection: 'column',
  },
  settingsContainer: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    paddingBottom: getFontSize(3),
    paddingLeft: getFontSize(1.5),
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
  },
  scrollContainer: {},
  tabBarContainer: {
    flexDirection: 'row',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRightWidth: 3,
    borderLeftWidth: 3,
    flexGrow: 0,
    paddingTop: 0,
    padding: getFontSize(2),
  },
  tab: {
    borderBottomWidth: 4,
    padding: getFontSize(1),
  },
  tabText: {
    fontSize: getFontSize(2),
    color: '#000',
    fontFamily: 'Roboto-Medium',
  },
  formField: {
    paddingLeft: getFontSize(1),
    paddingBottom: 10,
    marginRight: 100,
    ...Platform.select({
      ios: {
        paddingBottom: getFontSize(2),
      },
    }),
  },
  label: {
    fontSize: getFontSize(2.3),
    color: '#000',
    fontFamily: 'Roboto-Medium',
  },
  input: {
    height: getFontSize(5.5),
    fontFamily: 'Roboto-Regular',
    fontSize: getFontSize(2),
  },
  inputView: {
    ...Platform.select({
      ios: {
        borderBottomWidth: 2,
      },
    }),
  },
  tabBody: {},
  image: {
    marginLeft: getFontSize(1),
    marginBottom: getFontSize(2),
  },
  defaultIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    flex: 1,
    width: iconSize,
    height: iconSize,
  },
  saveButtonText: {
    flex: 1,
    margin: 15,
    fontSize: getFontSize(2.5),
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Roboto-Medium',
  },
  removeButton: {
    paddingRight: getFontSize(3),
  },
  removeButtonText: {
    color: '#E64C4C',
    fontSize: getFontSize(2),
    fontFamily: 'Roboto-Medium',
  },
  buttonColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#fff',
    elevation: 0,
    borderLeftWidth: 3,
    borderRightWidth: 3,
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

const options = require('./image-picker-options');

const ImagePicker = require('react-native-image-picker');
const Permissions = require('react-native-permissions');

const defaultUser = {
  nickName: __DEV__ ? 'Testikäyttäjä' : '',
  fullName: __DEV__ ? 'Matti Meikäläinen' : '',
  birthYear: __DEV__ ? '2010' : '',
};

const mapStateToProps = state => ({
  users: state.getIn(['user', 'users']),
});

const mapDispatchToProps = dispatch => ({
  createUser: user => dispatch(createUser(user)),
  editUser: user => dispatch(editUser(user)),
  removeUser: id => dispatch(removeUser(id)),
  showSaveModal: () => dispatch(showSaveModal()),
  toggleIsLoading: loading => dispatch(toggleIsLoading(loading)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class SettingsViewContainer extends Component {
  static navigationOptions = {
    title: 'Lapset',
    headerRight: <View />, // Needed for a centered title
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
  };

  static propTypes = {
    createUser: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired,
    removeUser: PropTypes.func.isRequired,
    toggleIsLoading: PropTypes.func.isRequired,
    users: PropTypes.instanceOf(List).isRequired,
    showSaveModal: PropTypes.func.isRequired,
  };

  state = {
    disabled: !__DEV__,
    id: null,
    image: null,
    ...defaultUser,
  };

  infoIsMissing = () =>
    this.state.nickName.length === 0 ||
    this.state.fullName.length === 0 ||
    this.state.birthYear.length === 0;

  saveChild = () => {
    if (this.infoIsMissing()) {
      Alert.alert(
        'Puuttuvia tietoja',
        'Varmistathan, että kaikki kohdat on täytetty ennen jatkamista.',
      );
    } else if (this.state.id === null) {
      this.createChild();
    } else {
      this.editChild();
    }
  };

  createChild = async () => {
    this.props.toggleIsLoading(true);

    try {
      const result = await post('/app/children', {
        name: this.state.fullName,
        birthYear: this.state.birthYear,
      });

      await this.props.createUser(
        Map({
          id: result.id,
          name: this.state.nickName,
          token: `Bearer ${result.token}`,
          image: this.state.image,
        }),
      );

      this.props.toggleIsLoading(false);
      this.setState({ disabled: true });
      this.resetForm();
      this.props.showSaveModal();
      this.handleTabClick(this.props.users.last());
    } catch (error) {
      console.log(error);
      this.props.toggleIsLoading(false);

      if (error.status === 400) {
        Alert.alert(
          'Käyttäjän luominen epäonnistui!',
          'Tarkista kenttien tiedot.',
        );
      } else if (error.status) {
        Alert.alert(
          'Käyttäjän luominen epäonnistui!',
          'Palvelimella tapahtui virhe. Yritä myöhemmin uudelleen.',
        );
      } else {
        Alert.alert(
          'Käyttäjän luominen epäonnistui!',
          'Tarkista nettiyhteytesi tai yritä myöhemmin uudelleen.',
        );
      }
    }
  };

  editChild = () => {
    this.props.editUser(
      Map({
        id: this.state.id,
        name: this.state.nickName,
        image: this.state.image,
      }),
    );

    this.setState({ disabled: true });
    this.props.showSaveModal();
  };

  verifyRemoveUser = () => {
    Alert.alert(
      'Oletko varma?',
      `Haluatko varmasti poistaa lapsen ${this.state.nickName}?`,
      [
        {
          text: 'Kyllä',
          onPress: this.removeUser,
        },
        {
          text: 'Peruuta',
        },
      ],
    );
  };

  removeUser = () => {
    this.props.removeUser(this.state.id);
    this.resetForm();
  };

  getChangedNickName = e => {
    if (this.state.disabled === true) {
      this.setState({ disabled: false });
    }

    this.setState({
      nickName: e.nativeEvent.text,
    });
  };

  getChangedFullName = e => {
    if (this.state.disabled === true) {
      this.setState({ disabled: false });
    }

    this.setState({
      fullName: e.nativeEvent.text,
    });
  };

  getChangedBirthYear = e => {
    if (this.state.disabled === true) {
      this.setState({ disabled: false });
    }

    this.setState({
      birthYear: e.nativeEvent.text,
    });
  };

  // TODO: Display default-image after opening.
  requestPhotoAndCameraPermission = async () => {
    try {
      return {
        photo: await Permissions.request('photo'),
        camera: await Permissions.request('camera'),
      };
    } catch (e) {
      console.log(e);
    }

    return { photo: 'undetermined', camera: 'undetermined' };
  };

  checkPhotoAndCameraPermission = async () => {
    try {
      return await Permissions.checkMultiple(['photo', 'camera']);
    } catch (e) {
      console.log(e);
    }

    return { photo: 'undetermined', camera: 'undetermined' };
  };

  openImageGallery = () => {
    ImagePicker.showImagePicker(options, response => {
      if (!response.didCancel) {
        const source = { uri: response.uri, isStatic: true };

        this.setState({
          disabled: false,
          image: source.uri ? source.uri : null,
        });
      }
    });
  };

  resetForm = () => {
    this.setState({
      id: null,
      nickName: '',
      fullName: '',
      birthYear: '',
      image: null,
    });
  };

  handleTabClick = user => {
    const isEmptyTab = user.get('id') === null;

    this.setState({
      disabled: true,
      id: user.get('id'),
      nickName:
        user.get('name') === '+ Lisää'
          ? defaultUser.nickName
          : user.get('name'),
      image: user.get('image'),
      fullName: isEmptyTab ? defaultUser.fullName : '*********',
      birthYear: isEmptyTab ? defaultUser.birthYear : '*********',
    });
  };

  renderTabBar = () =>
    <View style={styles.tabBar}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tabBarContainer}>
          {this.renderTabs()}
        </View>
      </ScrollView>
    </View>;

  renderTabs = () =>
    this.props.users
      .push(
        Map({
          name: '+ Lisää',
          image: null,
          id: null,
        }),
      )
      .map((user, key) => this.renderTab(user, key));

  renderTab = (user, key) =>
    <TouchableOpacity
      key={key}
      onPress={() => this.handleTabClick(user)}
      style={[
        styles.tab,
        { borderColor: user.get('id') === this.state.id ? '#1E90FF' : '#fff' },
      ]}
    >
      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        style={[
          styles.tabText,
          styles.font,
          {
            fontWeight: user.get('id') === this.state.id ? 'bold' : 'normal',
          },
        ]}
      >
        {user.get('name')}
      </Text>
    </TouchableOpacity>;

  renderNickNameField = () =>
    <View style={styles.formField}>
      <Text style={[styles.label, styles.font]}>Lempinimi</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          ref="nickName"
          onChange={this.getChangedNickName}
          value={this.state.nickName}
        />
      </View>
    </View>;

  renderFullNameField = () =>
    <View style={styles.formField}>
      <Text style={[styles.label, styles.font]}>Koko nimi</Text>
      <View style={styles.inputView}>
        <TextInput
          style={[
            styles.input,
            { color: this.state.id === null ? '#000' : '#D3D3D3' },
          ]}
          ref="fullName"
          editable={this.state.id === null}
          onChange={this.getChangedFullName}
          value={this.state.fullName}
        />
      </View>
    </View>;

  renderBirthYearField = () =>
    <View style={styles.formField}>
      <Text style={[styles.label, styles.font]}>Syntymävuosi</Text>
      <View style={styles.inputView}>
        <TextInput
          style={[
            styles.input,
            { color: this.state.id === null ? '#000' : '#D3D3D3' },
          ]}
          ref="birthYear"
          editable={this.state.id === null}
          onChange={this.getChangedBirthYear}
          value={this.state.birthYear}
          keyboardType={'numeric'}
        />
      </View>
    </View>;

  showRequestDialog = async () => {
    const permission = await this.requestPhotoAndCameraPermission();

    if (
      permission.camera === 'authorized' &&
      permission.photo === 'authorized'
    ) {
      this.openImageGallery();
    }
  };

  handleSelectImageClick = async () => {
    const permission = await this.checkPhotoAndCameraPermission();

    if (
      permission.camera !== 'authorized' ||
      permission.photo !== 'authorized'
    ) {
      // Show app-level dialog on iOS if permissions have been denied previously because iOS shows
      // system dialog only once, after that you have to allow permissions from settings
      if (
        Platform.OS === 'ios' &&
        permission.camera !== 'undetermined' &&
        permission.photo !== 'undetermined'
      ) {
        return Alert.alert(
          'Saammeko käyttää laitteesi kameraa ja kuvakirjastoa?',
          'Tarvitsemme oikeuden kameraan ja kuviin, jotta profiilikuvan valitseminen onnistuu.',
          [
            {
              text: 'Estä',
              onPress: () => console.log('permission denied'),
              style: 'cancel',
            },
            { text: 'Avaa asetukset', onPress: Permissions.openSettings },
          ],
        );
      }

      await this.showRequestDialog();
    } else {
      this.openImageGallery();
    }
  };

  renderDefaultImage = () =>
    <Image
      style={[styles.icon, styles.defaultIcon]}
      source={getImage('profilephoto').normal}
    >
      <Image
        source={getImage('take_photo').normal}
        style={getSizeByWidth('take_photo', 0.12)}
      />
    </Image>;

  renderUserImage = imageUri =>
    <Image style={styles.icon} source={{ uri: imageUri }} />;

  renderImage = () =>
    <TouchableOpacity
      onPress={this.handleSelectImageClick}
      style={styles.image}
    >
      {this.state.image
        ? this.renderUserImage(this.state.image)
        : this.renderDefaultImage()}
    </TouchableOpacity>;

  renderSaveButton = () =>
    <View style={styles.saveButton}>
      <AppButton
        onPress={this.saveChild}
        background="button_small"
        disabled={this.state.disabled}
        contentContainerStyle={{ padding: 10 }}
        width={getSizeByWidth('button_small', 0.4).width}
        shadow
      >
        <Text style={styles.saveButtonText}>
          {this.state.id === null ? 'Lisää' : 'Tallenna'}
        </Text>
      </AppButton>
    </View>;

  renderRemoveUserButton = () =>
    this.state.id !== null
      ? <TouchableOpacity
          style={styles.removeButton}
          onPress={this.verifyRemoveUser}
        >
          <Text style={styles.removeButtonText}>Poista lapsi</Text>
        </TouchableOpacity>
      : null;

  renderTabBody = () =>
    <Image source={getImage('forest').normal} style={styles.container}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'always'}
        overScrollMode={'always'}
        contentContainerStyle={styles.scrollContainer}
        resetScrollToCoords={{ x: 0, y: 0 }}
        extraScrollHeight={60}
      >
        <View style={styles.settingsContainer}>
          {this.renderImage()}
          {this.renderNickNameField()}
          {this.renderFullNameField()}
          {this.renderBirthYearField()}
          <View style={styles.buttonColumn}>
            {this.renderSaveButton()}
            {this.renderRemoveUserButton()}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Image>;

  render() {
    return (
      <View style={styles.container}>
        {this.renderTabBar()}
        {this.renderTabBody()}
      </View>
    );
  }
}
