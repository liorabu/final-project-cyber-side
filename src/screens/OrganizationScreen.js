import React from 'react';
import { Text, StyleSheet, View, ScrollView, TextInput } from 'react-native';
import { getOrgDashboard } from '../utils/MongoDbUtils';
import { UserContext } from '../contexts/UserContext';

class OrganizationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            systems: 0,
            doneSystems: 0,
            performedControls:0,
            userControls: 0
        }
        const unsubscribeFocus = null;
    }
    componentDidMount() {
         this.getDashboardData();
       
        this.unsubscribeFocus = this.props.navigation.addListener('focus', this.onScreenFocus);
    }

    componentWillUnmount() {
        if (this.unsubscribeFocus) {
            this.unsubscribeFocus();
        }
    }
    onScreenFocus = () => {
        // this.loadMyOganizations();
    }

    getDashboardData = ()=>{
        getOrgDashboard(this.context.orgId).then(result => {
            if (!result) {
                return;
            }
            this.setState({
                systems:result.userSystems,
                doneSystems:result.doneSystems,
                performedControls:result.performedControls,
                userControls:result.userControls
            });
        }).catch(error => {
            console.log('fail', error);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    {/* <Option text='מערכות קיימות' onPress={() => { this.props.navigation.navigate('Systems') }} /> */}

                </View>
                <View style={styles.dashboard}>
                    <>
                        <Text style={styles.dashboardText}>מערכות שהוזנו: {this.state.systems}</Text>
                        <Text style={styles.dashboardText}>בקרות כוללות לביצוע: {this.state.userControls}</Text>
                        <Text style={styles.dashboardText}>בקרות שהושלמו: {this.state.performedControls}</Text>
                        <Text style={styles.dashboardText}>מערכות בסטטוס סיום: {this.state.doneSystems}</Text>
                    </>
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
    }

});

OrganizationScreen.contextType = UserContext;
export default OrganizationScreen;