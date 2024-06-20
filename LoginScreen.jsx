import React, { useContext ,useState} from 'react'
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Input, Button } from '@rneui/themed';
import LinearGradient from 'expo-linear-gradient';

import { MY_URL, UserContext } from './ContextApp';


export default function LoginScreen() {
    const [email, setEmail] = useState('misha5');//TEST
    const [password, setPassword] = useState('misha5');
    const [msg, setMsg] = useState('');
    const { connectedUser, setConnectedUser } = useContext(UserContext);

    const navigation = useNavigation();

    const handleSubmit = () => {
        fetch(MY_URL + "login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: email, password: password }),
        }).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }).then((data) => {
            navigation.navigate('Home');
            setConnectedUser({ username: data.username, id: data.id });
            setMsg(``);
        }).catch((error) => {
            setMsg(`Username or password is incorrect!`);
            console.log("Login Error:", error);
        });
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder='EMAIL'
                errorStyle={{ color: 'red' }}
                errorMessage={msg}
                onChangeText={(text) => setPassword(text)}
            />

            <Input
                placeholder="PASSWORD"
                secureTextEntry={true}
                onChangeText={(text) => setEmail(text)}
            />
            <View
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, width: '50%' }}
            >

                <Button
                    ViewComponent={LinearGradient}
                    linearGradientProps={{
                        colors: ["#FF9800", "#F44336"],
                        start: { x: 0, y: 0.5 },
                        end: { x: 1, y: 0.5 },
                    }}
                    onPress={handleSubmit}
                >
                    Sign In
                </Button>
                <Button
                    ViewComponent={LinearGradient}
                    linearGradientProps={{
                        colors: ["#FF9800", "#F44336"],
                        start: { x: 0, y: 0.5 },
                        end: { x: 1, y: 0.5 },
                    }}
                    onPress={() => navigation.navigate('Registration')}
                >
                    Sign Up
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
