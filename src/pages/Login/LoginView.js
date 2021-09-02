//Standard imports
import React, { useState } from 'react';

//Api
import api from '../../services/api'

import { storeUser,storeUserToken } from '../../utils'

//Page texts
import LoginTexts from '../../texts';

//Native Components
import { View, Text, StyleSheet, Image, StatusBar, ActivityIndicator } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'

//Custom Components
import LoginInput from '../../components/Inputs/LoginInput';
import DefaultColors from '../../assets/colors/DefaultColors'

//import Button from '../../components/Buttons/Button';
//import SignIn from '../../components/Buttons/SignIn';

import { Container, Title, TextInformation, Error, Form, Input, Button, ButtonText, } from './Styles'

import GoogleLoginButton from '../../components/Buttons/GoogleLoginButton';
import FacebookLoginButton from '../../components/Buttons/FacebookLoginButton '

export default function LoginView(props) {

    const lang = "pt_br";
    //console.log(settings);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const texts = LoginTexts()[lang];

    breakLine = () => {
        const introduction = texts.login_introduction.split(" ")

        return introduction.map((word, index) => {

            return <Text key={index}>{"\n"}{word}</Text>

        })
    }
    async function signIn() {
        if (username.length === 0 || password.length === 0) {
            setErrorMessage('Usuário ou senha não podem estar vazios')
            return;
        }

        setLoading(true)

        try {

            const credentials = {
                email: username,
                senha: password
            }

            const loginResponse = await api.post('/login', credentials)            
            await storeUserToken(loginResponse.data);

            const userResponse = await api.get('/usuario');
            await storeUser(userResponse.data);

            console.log(loginResponse.data);
            console.log(userResponse.data);

            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'App' })],
            })

            setLoading(false)
            props.navigation.dispatch(resetAction)

        } catch (err) {
            
            console.log(err)

            setLoading(false)
            setErrorMessage('Usuário não existe')
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: DefaultColors["dark"].background,
            flexDirection: 'column',
            padding: 25
        },
        title: {
            flex: 1,
            fontSize: 40,
            color: '#fff',
            fontWeight: 'bold',
            marginBottom: 20,
        },
        socialButtons: {
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 10,
            marginTop: 10
        },
        image: {
            flex: 1,
            width: 200,
            height: 200,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: "baseline",
            marginBottom: 20,
        }
    })


    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    {breakLine()}
                </Text>
                <Image
                    source={require('../../assets/image/login_image.png')}
                    style={styles.image}
                />
            </View>
            {!!errorMessage && <Error>{errorMessage}</Error>}

            <Input
                color='#000000'
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Digite seu usuário"
                placeholderTextColor="#003f5c"
                value={username}
                onChangeText={username => setUsername(username)}
            />

            <Input
                color='#000000'
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Digite sua senha"
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                value={password}
                onChangeText={password => setPassword(password)}
            />

            <View style={styles.socialButtons}>
                <GoogleLoginButton lang={lang} />
                <FacebookLoginButton lang={lang} />
            </View>

            <Button onPress={signIn}>
                {loading ? (
                    <ActivityIndicator size="small" color="#FFF" />
                ) : (
                    <ButtonText>Prosseguir</ButtonText>
                )}
            </Button>
        </View>
    )
}