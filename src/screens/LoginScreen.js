import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, Image, TextInput, AsyncStorage, Alert, KeyboardAvoidingView, ScrollView, Platform, StatusBar } from 'react-native';
import MainButton from '../components/MainButton';
import { login } from '../utils/MongoDbUtils';
import { UserContext } from '../contexts/UserContext';


class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        }
    }
//check if user exists on click the button
    handleLoginClick = () => {
        if (this.state.username == '' || this.state.password == '') {
            Alert.alert('', 'יש להכניס מספר עובד וסיסמה', [{ text: 'אישור' }])
        }
        else {
            login(this.state.username, this.state.password)
                .then(result => {
                    console.log(result)
                    if (!result ) {
                        Alert.alert('', 'הנתונים שהוזנו לא תואמים את המידע שברשותנו', [{ text: 'אישור' }])
                        console.log('invalid usernumber / password');
                        return;
                    }
                    this.context.setUserId(result._id);
                    this.props.navigation.navigate('Home');
                })
                .catch(error => {
                    console.log('login failed', error);
                });
        }

    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <KeyboardAvoidingView behavior={null}>
                    <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.container} >
                        <Image style={[styles.image, styles.topImage]} source={require('../assets/cyber_logo.jpg')} resizeMode="contain" />
                        <View style={styles.dataContainer}>
                            <Text style={styles.textStyle}>מספר עובד</Text>
                            <TextInput
                                onChangeText={(text) => this.setState({ username: text })}
                                value={this.state.username}
                                placeholder='מספר עובד'
                                style={styles.input}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            <Text style={styles.textStyle}>סיסמה</Text>
                            <TextInput
                                onChangeText={(text) => this.setState({ password: text })}
                                value={this.state.password}
                                placeholder='סיסמה'
                                style={styles.input}
                                secureTextEntry={true}
                                returnKeyType='go'
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>
                        <MainButton title="התחבר" onPress={this.handleLoginClick} />
                        <Image style={[styles.image, styles.bottomImage]} source={require('../assets/logo.png')} resizeMode="contain" />
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        // flex: 1,
        paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    },
    container: {
        paddingHorizontal: 20,
    },
    image: {
        alignSelf: 'center',
        marginVertical: '2%',
    },
    topImage: {
        maxHeight: 140
    },
    bottomImage: {
        maxHeight: 190
    },
    dataContainer: {
        marginVertical: 15,
    },
    textStyle: {
        fontSize: 18,
       
    },
    input: {
        textAlign:'right',
        borderColor: '#797979',
        borderWidth: 3,
        borderRadius: 10,
        marginTop: '2%',
        paddingHorizontal: '2%',
        paddingVertical: '2%',
        fontSize: 15,
        marginBottom: '2%'
    },
    header: {
        backgroundColor: 'red'
    },
    keyboardViewContainer: {
        width: '100%',
        alignItems: 'center'
    },
})

LoginScreen.contextType = UserContext;

export default LoginScreen;