
import React, { PureComponent } from 'react'
import { BackHandler, Animated, Easing } from 'react-native'
import {
    createStackNavigator,
    createBottomTabNavigator,
    NavigationActions,
} from 'react-navigation'
import {
    createReduxContainer,
    createReactNavigationReduxMiddleware,
    createNavigationReducer,
} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'

import Loading from './containers/Loading'
import Login from './containers/Login'
import Home from './containers/Home'
import Account from './containers/Account'
import Detail from './containers/Detail'

const HomeNavigator = createBottomTabNavigator({
    Home: { screen: Home },
    Account: { screen: Account },
}, {
        // initialRouteName: 'Account',
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        }
    })
HomeNavigator.navigationOptions = ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index]

    return {
        header: null,
        headerTitle: routeName,
    }
}

const MainNavigator = createStackNavigator(
    {
        HomeNavigator: { screen: HomeNavigator },

        // Home: { screen: Home },
        Detail: { screen: Detail },
        // Account: { screen: Account },
    },

)

const AppNavigator = createStackNavigator(
    {
        Main: { screen: MainNavigator },
        Login: { screen: Login },
    },
    {
        // initialRouteName: 'Account',
        headerMode: 'none',
        mode: 'modal',
        navigationOptions: {
            gesturesEnabled: false, //是否可以使用手势关闭此屏幕 IOS 默认为true android 为false
        },
        transitionConfig: () => ({ // 具有自定义屏幕转换动画的
            transitionSpec: {
                duration: 300,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps
                const { index } = scene

                const height = layout.initHeight
                const translateY = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [height, 0, 0],
                })

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1],
                })

                return { opacity, transform: [{ translateY }] }
            },
        }),
    }

)

export const routerReducer = createNavigationReducer(AppNavigator)


export const routerMiddleware = createReactNavigationReduxMiddleware(
    state => state.router,
    'root'
)


const App = createReduxContainer(AppNavigator, 'root')

function getActiveRouteName(navigationState) {
    if (!navigationState) {
        return null
    }
    const route = navigationState.routes[navigationState.index]
    if (route.routes) {
        return getActiveRouteName(route)
    }
    return route.routeName
}

@connect(({ app, router }) => ({ app, router }))
class Router extends PureComponent {
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backHandle)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
    }

    backHandle = () => {
        const currentScreen = getActiveRouteName(this.props.router)
        if (currentScreen === 'Login') {
            return true
        }
        if (currentScreen !== 'Home') {
            this.props.dispatch(NavigationActions.back())
            return true
        }
        return false
    }

    render() {
        const { app, dispatch, router } = this.props
        if (app.loading) return <Loading />

        return <App dispatch={dispatch} state={router} />
    }
}

export default Router
