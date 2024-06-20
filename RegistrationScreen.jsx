import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from '@rneui/themed';
import LinearGradient from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { MY_URL, UserContext } from './ContextApp';

const RegistrationScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigation = useNavigation();
  const { setConnectedUser } = useContext(UserContext);

  const handleSubmit = () => {
    fetch(MY_URL + 'registration', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }).then((response) => {
      if (!response.ok) {
        // throw new Error(`HTTP error! status: ${response.status}`);
        // console.log(response.body);
        // console.log(response.message);
        // console.log(response.errors);
        return response.text().then(text => {
          console.log(text);
          throw new Error(JSON.parse(text).message)
        })
      }
      return response;
    }).then((data) => {
      setConnectedUser({ username: username, id: data.id });
      console.log(data);
      navigation.navigate('Home');
    }).catch((error) => {
      setMsg(error.message === "User Alrady Exists" ? "User Alrady Exists" : '');
      console.error('Registration Error:', error);
    });
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="USERNAME"
        onChangeText={(text) => setUsername(text)}
        errorStyle={{ color: 'red' }}
        errorMessage={msg}
      />

      <Input
        placeholder="PASSWORD"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        errorStyle={{ color: 'red' }}
        errorMessage={msg}
      />

      <Button
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: ['#FF9800', '#F44336'],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
        }}
        onPress={handleSubmit}
        title="Register"
      />

      <Button
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: ['#FF9800', '#F44336'],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
        }}
        onPress={() => navigation.navigate('Login')}
        title="Already have an account? Sign In"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default RegistrationScreen;