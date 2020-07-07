import React from 'react';
import { Text, StyleSheet, View, ScrollView, TextInput } from 'react-native';
import { getOrgDashboard ,getUserDetails} from '../utils/MongoDbUtils';
import { UserContext } from '../contexts/UserContext';

class OrganizationScreen extends React.Component {

    YEARS_FOR_QUESTIONS = 1;
    YEARS_FOR_CONTROLS = 3;

    constructor(props) {
        super(props);
        this.state = {
            // systems: 0,
            beginningDate: '',
            doneSystems: 0,
            performedControls: 0,
            userControls: 0
        }
        const unsubscribeFocus = null;
    }
    componentDidMount() {
        this.getDashboardData();
        this.loadOrgStartDate();
    }

    componentWillUnmount() {
        if (this.unsubscribeFocus) {
            this.unsubscribeFocus();
        }
    }

    loadOrgStartDate=()=>{
        getUserDetails(this.context.orgId).then(result => {
            if (!result) {
               return;
            }
            this.setState({
                beginningDate: result.beginningDate,
            });
        }).catch(error => {
            console.log('fail', error);
        });
    }
    

     //calulate dates 
     getFutureDate = (date, moreYears) => {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear() + moreYears;
        return `${day}/${month}/${year}`;
    }

    formatDate = (date) => {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        return `${day}/${month}/${year}`;
    } 

    getDashboardData = () => {
        getOrgDashboard(this.context.orgId).then(result => {
            if (!result) {
                return;
            }
            this.setState({
                systems: result.userSystems,
                doneSystems: result.doneSystems,
                performedControls: result.performedControls,
                userControls: result.userControls
            });
        }).catch(error => {
            console.log('fail', error);
        });
    }

    render() {
      if(!this.state.beginningDate){
          return(
            <Text>הנתונים נטענים,</Text>
          )
      }
        return (
            <View style={styles.container}>
                <View style={styles.dataContainer}>
                    <View style={styles.dataRow}>
                        <View style={styles.detailsRow}>
                            <Text style={[styles.dataTitle, { width:"100%",fontWeight: 'bold',textAlign:'center' }]}>תאריך תחילת העבודה</Text>
                          
                        </View>
                        <View style={styles.detailsRow}>
                            <Text  style={[styles.dataText, { width:"100%",textAlign:'center' }]} >{this.getFutureDate(this.state.beginningDate, 0)}</Text>
                           
                        </View>
                    </View >

                    <View style={styles.dataRow}>
                        <View style={styles.detailsRow}>
                            <Text style={[styles.dataTitle, { width: '50%', fontWeight: 'bold' }]}>סיום השלב הראשוני</Text>
                            <Text style={[styles.dataTitle, { fontWeight: 'bold' }]}>תאריך סיום התהליך</Text>
                        </View>
                        <View style={styles.detailsRow}>
                            <Text style={[styles.dataText, { width: '50%', textAlign: 'left' }]}>{this.getFutureDate(this.state.beginningDate, this.YEARS_FOR_QUESTIONS)}</Text>
                            <Text style={[styles.dataText, { alignSelf: 'flex-end' }]}>{this.getFutureDate(this.state.beginningDate, this.YEARS_FOR_CONTROLS)}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.dashboard}>
                    <>
                        <Text style={styles.dashboardText}>מערכות שהוזנו: {this.state.systems}</Text>
                        <Text style={styles.dashboardText}>בקרות כוללות לביצוע: {this.state.userControls}</Text>
                        <Text style={styles.dashboardText}>בקרות שהושלמו: {this.state.performedControls}</Text>
                        <Text style={styles.dashboardText}>מערכות בסטטוס סיום: {this.state.doneSystems}</Text>
                    </>
                </View>

                <View>
                    <Option text='מערכות שהוזנו' onPress={() => { this.props.navigation.navigate('Systems') }} />
                    <Option text='יצירת קשר' onPress={() => { this.props.navigation.navigate('UserDetails') }} />
                </View>
                
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
});

OrganizationScreen.contextType = UserContext;
export default OrganizationScreen;