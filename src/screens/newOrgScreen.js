import React from 'react';
import { Text, StyleSheet, View, Alert, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { saveNewOrg} from '../utils/MongoDbUtils';
import MainButton from '../components/MainButton';
import DateTimePicker from '@react-native-community/datetimepicker';

class newOrgScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orgName: null,
            orgNumber: null,
            password: null,
            beginningDate: new Date(),
        }
    }

    formatDate = (date) => {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        return `${day}/${month}/${year}`;
    } 

    saveOrg = () =>{
        if( !(!!this.state.orgName && !!this.state.orgNumber && !!this.state.password) ){
            Alert.alert('', 'יש למלא את כל השדות לצורך הוספת מפעל', [{ text: 'אישור' }])
        }
        else{
        saveNewOrg(this.state.orgName, this.state.orgNumber, this.state.password, this.state.beginningDate).then(result => {
            if (!result) {
                Alert.alert('הנתונים לא נשמרו', [{ text: 'אישור' }])
                console.log('invalid usernumber / password');
                return;
            }
            this.props.navigation.navigate('Home');
        })
    }
    }


    render() {
        console.log("date ", this.state.beginningDate)
        return (
            <KeyboardAvoidingView behavior={null} style={{ flex: 1 }}>
                <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.container} >

                    <View style={styles.dataGroup}>
                        <Text style={styles.title}>שם המפעל</Text >
                        <TextInput style={styles.inputStyle}
                            onChangeText={(text) => this.setState({ orgName: text })}
                            returnKeyType='go'
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={this.state.orgName}
                        />
                    </View>

                    <View style={styles.dataGroup}>
                        <Text style={styles.title}>מספר ארגון</Text >
                        <TextInput style={styles.inputStyle}
                            onChangeText={(text) => this.setState({ orgNumber: text })}
                            returnKeyType='go'
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={this.state.contactPhone}
                            keyboardType={'numeric'}
                        />
                    </View>

                    <View style={styles.dataGroup}>
                        <Text style={styles.title}>סיסמה</Text >
                        <TextInput style={styles.inputStyle}
                            onChangeText={(text) => this.setState({ password: text })}
                            returnKeyType='go'
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={this.state.password}
                        />
                    </View>

                    <View style={styles.dataGroup}>
                        <Text style={styles.title}>תאריך תחילת התהליך</Text >
                        <TouchableOpacity style={styles.inputStyle} onPress={() => this.setState({ showDatePicker: true })}>
                            <Text style={{ textAlign: 'left' }}>{this.formatDate(this.state.beginningDate)}</Text>
                        </TouchableOpacity>
                        {!!this.state.showDatePicker &&
                            <DateTimePicker
                                value={this.state.beginningDate}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => {
                                    if (selectedDate) {
                                        this.setState({
                                            beginningDate: selectedDate,
                                            showDatePicker: false
                                        })
                                    }
                                }}
                            />
                        }
                    </View>


                    <MainButton
                        title="עדכון פרטים"
                        onPress={this.saveOrg}
                        width="65%"
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    scrollViewContainer: {
        // flex: 1,
        paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,

    },

    container: {
        justifyContent: 'space-between',
        // flex:1
        paddingHorizontal: 20,
        flexGrow: 1,
        flexShrink: 1,
        // justifyContent: 'space-evenly'
    },
    titleStyle: {
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25
    },
    dataGroup: {
        width: '100%'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,

    },
    dataStyle: {
        marginTop: 5,
        fontSize: 16,
        textAlign: 'left'
    },
    inputStyle: {
        borderColor: '#169BD5',
        borderWidth: 3,
        borderRadius: 10,
        marginTop: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 15,
        textAlign: 'right'
    },
})


newOrgScreen.contextType = UserContext;

export default newOrgScreen;