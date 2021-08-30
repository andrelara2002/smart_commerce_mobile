import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Login from '../pages/Login/LoginView'
import Home from '../pages/Home/HomeView'

const screens = {
    Login: {
        screen: Login
    },
    Home: {
        screen: Home
    }
}

const HomeStack = createStackNavigator(screens)

export default createAppContainer(HomeStack)