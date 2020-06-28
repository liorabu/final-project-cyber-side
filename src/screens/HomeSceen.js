import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { getDashboardData } from '../utils/MongoDbUtils';
import Option from '../components/Option';


class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            organizations: 0,
            systems: 0,
            systemsStageOne: 0,
            systemsStageTwo: 0,
            doneSystems: 0,
        }
        const unsubscribeFocus = null;
    }
    componentDidMount() {
        this.loadDashboardData();
        this.unsubscribeFocus = this.props.navigation.addListener('focus', this.onScreenFocus);
      }
    
      componentWillUnmount() {
        if (this.unsubscribeFocus) {
          this.unsubscribeFocus();
        }
      }
      onScreenFocus = () => {
        this.loadDashboardData();
      }
    //loaad the general data
      loadDashboardData = () => {
        getDashboardData().then(result => {
          if (!result) {
            return;    
          }
          this.setState({
            organizations:result.organizations,
            systems: result.systems,
            systemsStageOne: result.systemsStageOne,
            systemsStageTwo: result.systemsStageTwo,
            doneSystems: result.doneSystems
          });
        }).catch(error => {
          console.log('fail', error);
        });
      }
    
    render() {
        return (
            <View style={styles.container}>
            <View>
              {/* <Option text='פרטים אישיים' onPress={() => { this.props.navigation.navigate('UserDetails') }} />
              <Option text='צור קשר' onPress={() => { this.props.navigation.navigate('Contact') }} />
              <Option text='מערכות שהוזנו' onPress={() => { this.props.navigation.navigate('Systems') }} />
              <Option text='הזנת מערכת' onPress={() => { this.props.navigation.navigate('NewSystem') }} /> */}
            </View>
    
            <View style={styles.dashboard}>
                <>
                  <Text style={styles.dashboardText}>ארגונים קיימים: {this.state.organizations}</Text>
                  <Text style={styles.dashboardText}>מערכות קיימות: {this.state.systems}</Text>
                  <Text style={styles.dashboardText}>מערכות בחישוב רמת סיכון: {this.state.systemsStageOne}</Text>
                  <Text style={styles.dashboardText}>מערכות בביצוע בקרות: {this.state.systemsStageTwo}</Text>
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
  HomeScreen.contextType = UserContext;
  export default HomeScreen;