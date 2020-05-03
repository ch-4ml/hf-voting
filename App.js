import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import Home from './screens/Home';
import RegisterWallet from './screens/RegisterWallet';
import WalletList from './screens/WalletList';
import FabcarQueryTest from './screens/FabcarQueryTest';

const App = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    RegisterWallet: {
      screen: RegisterWallet
    },
    WalletList, // 속성이 screen 밖에 없으면 중괄호 생략 가능
    FabcarQueryTest
  },
  {
    initialRouteName: 'Home'
  }
)

const AppContainer = createAppContainer(App);

// 바로 () 쓰면 return 생략하는 건가?
export default () => (
  <SafeAreaView style={styles.container}>
    <AppContainer />
  </SafeAreaView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})