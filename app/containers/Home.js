import React, { Component } from 'react'
import { View, Text, Image, ImageBackground } from 'react-native'
import { connect } from 'react-redux'

import { Button } from '../components'
import { ScaledSheet, scale } from 'react-native-size-matters/extend';
import { NavigationActions } from '../utils'

@connect()
class Home extends Component {

    state = {}
    static navigationOptions = {
        tabBarLabel: 'Home',
        headerTitle: "123456",
        title: 'Welcome',
        headerStyle: {
            color: 'red'
        },
        header: null,
        tabBarIcon: ({ focused, tintColor }) => (
            <Image
                style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
                source={require('../images/house.png')}
            />
        ),
    }
    static defaultNavigationOptions = {
        title: 'Welcome'
    }
    componentWillMount() {

        // this.props.dispatch({
        //     type: 'app/getStoreConfig',
        //     payload: { storeId: 2123 }
        // })
        console.log(scale(1920), '++++++++++++++++++++')
    }
    gotoDetail = () => {
        // this.props.navigation.openDrawer();
        console.log(this.props.navigation)
        this.props.dispatch(NavigationActions.navigate({ routeName: 'Detail' }))
    }

    render() {
        return (
            <ImageBackground source={{ uri: 'http://pic15.nipic.com/20110629/5078207_164705330000_2.jpg' }} style={styles.img}>
                <View style={styles.container}>
                    <Button text="Goto Detail" onPress={this.gotoDetail} />
                    <View><Text style={styles.tips}>大鼓米ss线s人民东路店</Text></View>
                    <Text style={{ color: 'red' }}>
                        and red
                </Text>
                </View>
            </ImageBackground>
        )
    }
}

const styles = ScaledSheet.create({
    img: {
        flex: 1
    },
    container: {
        width: '1920@s', // = scale(100)
        height: '288@vs',
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10

    },
    tips: {
        fontSize: '40@s',
        color: 'pink'
    },
    icon: {
        width: 32,
        height: 32,
    },
})

export default Home
