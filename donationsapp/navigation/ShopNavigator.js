import { createAppContainer,createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Colors from "../constants/Colors";
import { Platform } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import React from "react";
import { Ionicons } from '@expo/vector-icons';
import UserProductsScreen from '../screens/user/UserProductsScreen'
import EditProductScreen from '../screens/user/EditProductScreen'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import AuthScreen from '../screens/user/AuthScreen'
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary

};
const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-man' : 'ios-man'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);



const AdminsNavigator = createStackNavigator(
    {
      UserProducts: UserProductsScreen,
      EditProduct: EditProductScreen
    },
    {
      navigationOptions: {
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-color-fill' : 'ios-color-fill'}
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      },
      defaultNavigationOptions: defaultNavOptions
    }
  );
  const Navigator = createDrawerNavigator(
    {
      Donations: AdminsNavigator,
      Distributions: ProductsNavigator,
      
    },
    {
      contentOptions: {
        activeTintColor: Colors.primary
      }
    }
  );
  const AuthNavigator = createStackNavigator({
    Auth:AuthScreen
  
  },
  {
    defaultNavigationOptions: defaultNavOptions
  
  }
    
  )
  
  const MainNavigator=createSwitchNavigator({
    Auth:AuthNavigator,
    donation:Navigator
    
  
  })



export default createAppContainer( MainNavigator);
