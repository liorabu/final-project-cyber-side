import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Option from '../components/Option';
import { getSystem, getSystemsPerformedControls } from '../utils/MongoDbUtils';
import { Modal } from 'react-native';
// import { Picker } from '@react-native-community/picker';
import { UserContext } from '../contexts/UserContext';

class SystemScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            system: '',
            performedControls: 0
        }
        const unsubscribeFocus = null;
    }
    componentDidMount() {
        this.loadThisSystem();
        // this.unsubscribeFocus = this.props.navigation.addListener('focus', this.onScreenFocus);
        // this.loadMaxRisk();
    }
    componentWillUnmount() {
        if (this.unsubscribeFocus) {
            this.unsubscribeFocus();
        }
    }
    onScreenFocus = () => {
        this.loadThisSystem();
        // console.log(this.state.system.riskLevel)
    }

    //load the system's data
    loadThisSystem = () => {
        getSystem(this.context.systemId).then(result => {
            if (!result) {
                return;
            }
            this.setState({
                system: result,
            });
        }).catch(error => {
            console.log('fail', error);
        });
        getSystemsPerformedControls(this.context.systemId).then(result => {
            if (!result) {
                return;
            }
            this.setState({
                performedControls: result.length,
            });
        }).catch(error => {
            console.log('fail', error);
        });
    }
    render() {
        console.log(this.state.performedControls)
        return (

            <View style={styles.container} >
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{this.state.system.name}</Text>
                </View>
                <View style={styles.dataContainer}>
                    <View style={styles.dataRow}>
                        <View style={styles.detailsRow}>
                            <Text style={[styles.dataTitle, { fontWeight: 'bold' }]}>רמת סיכון</Text>
                            <Text style={[styles.dataTitle, { fontWeight: 'bold' }]}>סטטוס עבודה</Text>
                        </View>
                        <View style={styles.detailsRow}>
                            <Text style={[styles.dataText, { width: '50%', textAlign: 'left' }]}>{this.state.system.riskLevel}</Text>
                            <Text style={styles.dataText} >{this.state.system.status}</Text>
                        </View>
                    </View >

                    <View style={styles.dataRow}>
                        <View style={styles.detailsRow}>
                            <Text style={[styles.dataTitle, { width: '50%', fontWeight: 'bold' }]}>חומ"ס בשימוש</Text>
                            <Text style={[styles.dataTitle, { fontWeight: 'bold' }]}>סיכון מקסימלי</Text>
                        </View>
                        <View style={styles.detailsRow}>
                            <Text style={[styles.dataText, { width: '50%', textAlign: 'left' }]}>{this.state.system.materials}</Text>
                            <Text style={[styles.dataText, { alignSelf: 'flex-end' }]}>{this.state.system.maxRisk}</Text>

                        </View>
                    </View>
                    <View style={styles.dataRow}>
                        <View style={styles.detailsRow}>
                            <Text style={[styles.dataTitle, { width: '50%', fontWeight: 'bold' }]}>מספר בקרות נדרשות: </Text>
                            <Text style={[styles.dataTitle, { fontWeight: 'bold' }]}>בקרות שהושלמו</Text>
                        </View>
                        <View style={styles.detailsRow}>
                        {this.state.system.controlsNumber ?
                            <Text style={[styles.dataText, { width: '50%', textAlign: 'left' }]}>{this.state.system.controlsNumber}</Text>
                            :
<Text style={[styles.dataText, { width: '50%', textAlign: 'left' }]}>0</Text>
                        }
                            <Text style={[styles.dataText, {textAlign:'center'  }]}>{this.state.performedControls}</Text>

                        </View>
                    </View>
                </View>
                {/* <View style={styles.dashboard}>
                    <>
                        {this.state.system.controlsNumber ?
                            <Text style={styles.dashboardText}>מספר בקרות נדרשות: {this.state.system.controlsNumber}</Text>
                            :
                            <Text style={styles.dashboardText}>מספר בקרות נדרשות: 0</Text>
                        }
                        <Text style={styles.dashboardText}>בקרות שהושלמו: {this.state.performedControls}</Text>
                    </>
                </View> */}


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'space-evenly'
    },
    dataContainer: {
        paddingBottom: '4%',
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: '6%',
    },
    descriptionStyle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 7
    },
    edit: {
        fontSize: 15,
        color: '#169BD5',
        marginBottom: 7
    },
    title: {
        width: '100%',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: '5%',
    },
    dataContainer: {
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderTopColor: '#d6d6d6',
        borderBottomColor: '#d6d6d6',
        marginBottom: '5%',
    },
    dataRow: {
        alignItems: 'stretch',
        paddingHorizontal: '2%',
        paddingVertical: '2%',
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },

    dataTitle: {
        fontSize: 16,
        marginVertical: '0.5%',
    },

    dataText: {
        fontSize: 14,
        marginVertical: '0.5%',
    },
    dashboard: {
        borderWidth: 1,
        borderColor: '#000000',
        backgroundColor: '#D3D3D3',
        paddingHorizontal: '2%',
        paddingVertical: '3%'
    },
    dashboardText: {
        fontSize: 16,
        marginBottom: '1%'
    }
});



SystemScreen.contextType = UserContext;

export default SystemScreen;