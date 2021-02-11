import React, { Component } from 'react'
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, Alert } from 'react-native'
import firebase from '../database/firebaseDb'
import { ThemeProvider, Button, Input, Image } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

class UserDetailScreen extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            email: '',
            mobile: '',
            isLoading: true
        }
    }

    componentDidMount() {
        const dbRef = firebase.firestore().collection('react-native-crud').doc(this.props.route.params.userKey);
        dbRef.get().then((res) => {
            if (res.exists) {
                const user = res.data();
                this.setState({
                    key: res.id,
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    isLoading: false
                })
            } else {
                console.log('Document does not exist!');
            }
        })
    }

    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    updateUser() {
        this.setState({
            isLoading: true
        })
        const updateDBRef = firebase.firestore().collection('react-native-crud').doc(this.state.key);
        updateDBRef.set({
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
        }).then((docRef) => {
            this.setState({
                key: '',
                name: '',
                email: '',
                mobile: '',
                isLoading: false
            })
            this.props.navigation.navigate('UserScreen');
        })
        .catch((err) => {
            console.error('Error:', err),
            this.setState({
                isLoading: false,
            })
        })
    }

    deleteUser() {
        const dbRef = firebase.firestore().collection('react-native-crud').doc(this.props.route.params.userKey);
        dbRef.delete().then((res) => {
            console.log("Item removed from database");
            this.props.navigation.navigate('UserScreen');
        })
    }

    openTwoButtonAlert = () => {
        Alert.alert(
            'Delete User',
            'Are you sure?',
            [
                {text: 'Yes', onPress: () => this.deleteUser()},
                {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'}
            ],
            {
                cancelable: true
            }
        )
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )
        }

        return(
            <ThemeProvider theme={theme}>
                <ScrollView style={styles.container}>
                    <Input 
                        placeholder={'Name'}
                        value={this.state.name}
                        onChangeText={(val) => this.inputValueUpdate(val, 'name')}
                    />
                    <Input 
                        placeholder={'Email'}
                        value={this.state.email}
                        onChangeText={(val) => this.inputValueUpdate(val, 'email')}
                    />
                    <Input 
                        placeholder={'Mobile'}
                        value={this.state.mobile}
                        onChangeText={(val) => this.inputValueUpdate(val, 'mobile')}
                    />
                    <Button 
                        icon={
                            <Icon 
                                name="wrench"
                                size={15}
                                color="#fff"
                            />
                        }
                        title='  Update'
                        onPress={() => this.updateUser()}
                    />
                    <Button 
                        icon={
                            <Icon 
                                name="trash"
                                size={15}
                                color="#fff"
                            />
                        }
                        title='  Delete'
                        containerStyle={{
                            marginTop: 10
                        }}
                        buttonStyle={{
                            backgroundColor: "red"
                        }}
                        onPress={this.openTwoButtonAlert}
                    />
                </ScrollView>
            </ThemeProvider>
        )
    }
}


const theme = {
    Button: {
        raised: true
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    preloader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default UserDetailScreen;