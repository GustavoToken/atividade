import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Atividade from "./src/screens/Atividade";

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Atividade" component={Atividade} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default App;