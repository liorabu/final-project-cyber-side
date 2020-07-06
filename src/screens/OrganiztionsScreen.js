import React from 'react';
import { Text, StyleSheet, View, ScrollView, TextInput } from 'react-native';
import { getOrganizations } from '../utils/MongoDbUtils';
import { UserContext } from '../contexts/UserContext';
import SearchBar from '../components/SearchBar';
import { Feather } from '@expo/vector-icons';

class OrganiztionsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            organizations: [],
            filter: ''

        }
        const unsubscribeFocus = null;
    }
    componentDidMount() {
        this.loadMyOganizations();
        this.unsubscribeFocus = this.props.navigation.addListener('focus', this.onScreenFocus);
    }

    componentWillUnmount() {
        if (this.unsubscribeFocus) {
            this.unsubscribeFocus();
        }
    }
    onScreenFocus = () => {
        this.loadMyOganizations();
    }

    loadMyOganizations = () => {
        getOrganizations().then(result => {
            if (!result) {
                return;
            }
            this.setState({
                organizations: result,
            });
        }).catch(error => {
            console.log('fail', error);
        });
    }

    //get the Org's data
    getOrgData = (organization) => {
        this.context.setOrgId(organization._id);
        console.log(this.context.orgId)
        this.context.setOrgName(organization.name);
        this.props.navigation.navigate('Organization')
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View style={styles.backgroundStyle}>
                    <Feather name="search" style={styles.iconStyle} />
                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false}
                        style={styles.inputStyle}
                        placeholder="Search"
                        value={this.state.filter}
                        onChangeText={(text) => this.setState({ filter: text })}
                    // onEndEditing={onTermSubmit}
                    />
                </View>
                <ScrollView>
                    {
                        // this.state.organizations.map((item) => {
                            this.state.organizations.filter((value) => {
                                return value.name.toUpperCase().includes(this.state.filter.toUpperCase());
                            }).map((item) => {
                            return (
                                <Option key={item._id} text={item.name}  onPress={() => { this.getOrgData(item)}}/>
                            )
                        })
                    }
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    backgroundStyle: {
        marginTop: 15,
        backgroundColor: '#f0eeee',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row-reverse',
        marginBottom:'2.5%'
    },
    inputStyle: {
        flex: 1,
        fontSize: 18
    },
    iconStyle: {
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 15
    }
});


OrganiztionsScreen.contextType = UserContext;
export default OrganiztionsScreen;