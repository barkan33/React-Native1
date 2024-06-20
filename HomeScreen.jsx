import { useContext } from 'react'
import { Text, View } from 'react-native'
import { UserContext } from './ContextApp';

export default function HomeScreen() {
    const { connectedUser, setConnectedUser } = useContext(UserContext);

    return (
        <View
            style={{ marginHorizontal: "auto", marginVertical: "50%", height: "100%" }}>
            <Text
                style={{ fontSize: 30, fontWeight: "bold", color: "black" }}
            >Hello, {connectedUser.username}</Text>
        </View>
    )
}
