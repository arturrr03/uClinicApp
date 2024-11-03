import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Home,
  SplashScreen,
  SignIn,
  SignUp,
  Profile,
  Keluhan,
  Rekam,
  DescRm,
} from '../pages';

const Stack = createNativeStackNavigator();
const index = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Keluhan"
        component={Keluhan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Rekam"
        component={Rekam}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DescRm"
        component={DescRm}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default index;
