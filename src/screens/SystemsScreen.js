import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native';
import { getSystems } from '../utils/MongoDbUtils';
import { UserContext } from '../contexts/UserContext';
import { Modal } from 'react-native';




class SystemsScreen extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            systems: [],
            isLoading: false,
            descriptionModal: true,
        }

        const unsubscribeFocus = null;
    }

    componentDidMount() {
        // this.loadMySystems();
        this.unsubscribeFocus = this.props.navigation.addListener('focus', this.onScreenFocus);
    }

    componentWillUnmount() {
        if (this.unsubscribeFocus) {
            this.unsubscribeFocus();
        }
    }

    onScreenFocus = () => {
        this.loadMySystems();
    }
    //convert the status to number
    getSystemStatusLevel = (statusText) => {
        switch (statusText) {
            case 'חישוב רמת סיכון': {
                return 1;
            }
            case 'ביצוע בקרות': {
                return 2;
            }
            case 'סיום': {
                return 3;
            }
            default: {
                return 0;
            }
        }
    }
    //load the systems and sort by status
    loadMySystems = () => {
        getSystems(this.context.orgId).then(result => {
            if (!result) {
                return;
            }
            if (result.length > 0) {
                
                this.state.isLoading = true
            }

            result.sort((a, b) => {
                const aLevel = this.getSystemStatusLevel(a.status);
                const bLevel = this.getSystemStatusLevel(b.status);

                return aLevel - bLevel;

            });

            this.setState({
                systems: result,
            });
        }).catch(error => {
            console.log('fail', error);
        });

    }
    //get the systems' data
    getSystemData = (system) => {
        this.context.setSystemId(system._id);
        this.context.setSystemName(system.name);
        this.props.navigation.navigate('System')
    }



    //get color by status
    backgroundBystage = (system) => {
        if (system.status == "חישוב רמת סיכון") {
            return "#F59997"
        }
        else if (system.status == "ביצוע בקרות") {
            return "#FEF3BD"
        }
        else if (system.status == "סיום") {
            return "#B2D5B7"
        }
    }
    //close the modal
    onCloseDescription = () => {
        this.setState({
            descriptionModal: false,
        });
    }


    render() {
        if (!this.state.isLoading) {
            console.log("load");
            return (
             
                <View style={styles.loadingContainer}>
                  
                    <Text style={styles.loadingText}>לא הוזנו מערכות ממוחשבות</Text>
                </View>
            )
        }
        else {
            console.log("systems");
            return (
                <ScrollView>
                    <View>
                        {
                            this.state.systems.map((item) => {
                                return (
                                    // <TouchableOpacity style={styles.systemContainer} key={item._id} onPress={() => { this.getSystemData(item) }}>
                                      <TouchableOpacity style={styles.systemContainer} key={item._id}>
                                      <View style={styles.dataStyle}>
                                            <Text style={styles.systemName} >
                                                שם המערכת: {item.name}
                                            </Text>
                                            <Text >סטטוס: {item.status}</Text>
                                        </View>
                                        <View style={[styles.circleStyle, { backgroundColor: this.backgroundBystage(item), borderColor: this.backgroundBystage(item) }]}>

                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                        <Modal
                            onRequestClose={this.onCloseDescription}
                            visible={this.state.descriptionModal} >
                            <View style={styles.outerStyle}>
                                <View style={styles.inner}>
                                    <Text style={styles.modalText}>בחלון זה מוצגות המערכות הממוחשבות שהוזנו.</Text>
                                    <Text style={styles.modalText}>המידע המוצג לכל מערכת הוא שם המערכת וסטטוס ההתקדמות מבחינת בתהליך.</Text>
                                    <Text style={styles.modalText}>בנוסף, לצורך ראייה נוחה יותר על מצב כלל המערכות, לצד כל מערכת מופיע אייקון בצבע שונה המראה את מצב התקדמות שלה:</Text>
                                    <Text style={styles.modalText}>צבע אדום מסמל את שלב חישוב רמת הסיכון של המערכת ובו נדרש מענה על השאלות המופיעות בדף המערכת.</Text>
                                    <Text style={styles.modalText}>צבע צהוב מסמל את שלב ביצוע הבקרות בהתאם לרמת הסיכון שהתקבלה.</Text>
                                    <Text style={styles.modalText}>צבע ירוק מסמל את סיום הדרישות לגבי המערכת הספציפית.</Text>
                                    <Text style={[styles.modalText, { marginTop: 10 }]}>לקבלת מידע מפורט לגבי מערכת ספציפית יש ללחוץ על באיזור המידע שלה.</Text>
                                    <TouchableOpacity onPress={this.onCloseDescription}>
                                        <Text style={styles.closeButton}>סגירה</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </ScrollView>
            )
        }
    }
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        fontSize: 23
    },
    loadingLink: {
        fontSize: 19,
        color: '#acacac',
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        paddingHorizontal: '1%',
    },
    NewSystemTouchable: {
        paddingStart: 10,
        paddingVertical: '2%'
    },
    NewSystemText: {
        fontSize: 20,
        color: '#169BD5',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    FlatStyle: {
        marginTop: '2%'
    },
    systemContainer: {
        borderColor: '#169BD5',
        borderWidth: 3,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        paddingBottom: '3%',
        paddingHorizontal: '3%',
        marginVertical: '1%',
        marginHorizontal: '1%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    dataStyle: {
        flex: 1
    },
    circleStyle: {
        borderWidth: 5,
        height: 40,
        width: 40,
        borderRadius: 25,
    },
    systemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 0
    },
    systemDetails: {
        fontSize: 14,
        marginVertical: 3
    },
    secondRaw: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    outerStyle: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    inner: {
        backgroundColor: 'white',
        paddingHorizontal: '5%',
        paddingVertical: '2%',
        width: '100%',
        borderColor: 'black',
        borderWidth: 1
    },
    modalText: {
        alignSelf: 'flex-start',
        fontSize: 16
    },
    closeButton: {
        color: '#169BD5',
        paddingTop: '3%'
    },
});


SystemsScreen.contextType = UserContext;

export default SystemsScreen;