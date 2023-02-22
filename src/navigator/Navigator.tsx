import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DetailScreen, HomeScreen} from '../screens';

export type ProductsStackParams = {
  HomeScreen: undefined; //Pantalla no recibe argumentos
  DetailScreen: {id: string}; //Pantalla que recibe un argumento id
};
const Stack = createStackNavigator<ProductsStackParams>(); //creamos una pila de navegacion y lo tipamos para especificar los parametros de navegacion

export const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
};
