import React from "react"
import {createAppContainer} from "react-navigation";
import{createStackNavigator} from "react-navigation-stack";
import HomeScreen from "./Screens/Home";
import DetailsScreen from "./Screens/Details";
export default function App(){
  return <AppContainer/>;
}
const appStackNavigator=createStackNavigator(
  {
    Home:{
      screen:HomeScreen,
      navigationOptions:{
        headerShown:false
      }
      },
      Details:{
        srceen:DetailsScreen
    }
  },
  {
    initialRouteName:"Home"
  }
)
const AppContainer=createAppContainer(appStackNavigator)