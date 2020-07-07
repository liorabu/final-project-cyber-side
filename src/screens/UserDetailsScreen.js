import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { getUserDetails, saveUserData } from '../utils/MongoDbUtils';
import MainButton from '../components/MainButton';





class UserDetailsScreen extends React.Component {

    YEARS_FOR_QUESTIONS = 1;
    YEARS_FOR_CONTROLS = 3;

    constructor(props) {
        super(props);
        let dateToday;
        this.state = {
            contactEmail: null,
            contactPerson: null,
            contactPhone: null,
            name: null,
            wasLoaded: false,
            emptyData: false,
        }
    }

    componentDidMount() {
        this.loadUserData();

    }
    //load the data of the yser
    loadUserData = () => {
        getUserDetails(this.context.orgId).then(result => {
            if (!result) {
               return;
            }
            else if(!result.contactEmail && !result.contactPerson && !result.contactPhone){
                this.setState({
                    emptyData: true,
                });
            }
            this.setState({
                contactEmail: result.contactEmail,
                contactPerson: result.contactPerson,
                contactPhone: result.contactPhone,
                name: result.name,
                wasLoaded: true
            });
        }).catch(error => {
            console.log('fail', error);
        });
    }

    render() {
        if (!this.state.wasLoaded) {
            return (
                <View style={styles.loadContainer} >
                    <Text style={styles.loadDetails}>הנתונים נטענים,</Text>
                    <Text style={styles.loadDetails}>אנא המתן</Text>
                </View>
            )
        }
        else if (this.state.emptyData){
            return(
            <View style={styles.loadContainer} >
                    <Text style={styles.loadDetails}>פרטי איש הקשר לא הוזנו ע"י הארגון</Text>
                </View>
            )
        }

            return (
                <View style={styles.container}>

                    <View style={styles.dataGroup}>
                        <Text style={styles.title}>איש קשר</Text >
                        <Text style={styles.dataStyle}>{this.state.contactPerson}</Text>
                    </View>

                    <View style={styles.dataGroup}>
                        <Text style={styles.title}>טלפון ליצירת קשר</Text >
                        <Text style={styles.dataStyle}>{this.state.contactPhone}</Text>
                    </View>

                    <View style={styles.dataGroup}>
                        <Text style={styles.title}>מייל ליצירת קשר</Text >
                        <Text style={styles.dataStyle}>{this.state.contactEmail}</Text>
                    </View>
                   </View>
            )
            
    
}

}
const styles = StyleSheet.create({


    container: {
        justifyContent: 'space-around',
        flex: 1,
        paddingHorizontal: 20,
     
    },
    titleStyle: {
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25
    },
    dataGroup: {
        width: '100%',
        

    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign:'center'

    },
    dataStyle: {
        marginTop: 5,
        fontSize: 16,
        textAlign:'center'
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
    loadContainer: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center'
    },
    loadDetails: {
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 10,
        color: "#757575"

    },
})


UserDetailsScreen.contextType = UserContext;

export default UserDetailsScreen;