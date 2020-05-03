import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableNativeFeedback, Platform, TextInput } from 'react-native';

export default Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>홈 화면입니다.</Text>
      <View style={styles.fdr}>
        <Button 
          title="지갑 만들기"
          onPress={() => navigation.navigate('RegisterWallet')} />
        <Button
          title="내 지갑 목록"
          onPress={() => navigation.navigate('WalletList')} />
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
    fdr : {
      width: '50%',
      flexDirection: 'row',
      justifyContent: 'space-around'
    }
  });
  