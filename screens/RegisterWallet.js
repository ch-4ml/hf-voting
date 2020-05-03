import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-fetch-blob';
import { unzip } from 'react-native-zip-archive';

// android: DownloadDirectoryPath, ExternalDirectoryPath, ExternalStorageDirectoryPath
const documentPath = RNFS.DownloadDirectoryPath + '/wallet';
const registerURL = 'http://fetch2.ddns.net:3000/register'

unzipFile = (file) => {
  const filePath = file.path()
  const walletName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'))
  unzip(filePath, documentPath + `/${walletName}`)
  .then(path => {
    console.log(`unzip 성공: ${path}`)
  }).catch((err, status) => {
    console.log(`${status}: ${err}`)
  })
}

registerWallet = async (walletName) => {
  const dirs = RNFetchBlob.fs.dirs.DownloadDir + '/wallet'
  const path = dirs + `/${walletName}.zip`

  RNFetchBlob
  .config({
    path: path,
  })
  .fetch('GET', registerURL)
  .then(file => {
    console.log(`wallet file 다운로드 성공: ${file.path()}`)
    this.unzipFile(file)
  })
  .catch((err, status) => {
    console.log(`${status}: ${err}`)
  })
}

export default RegisterWallet = () => {
const [walletName, setWalletName] = useState('')
return (
    <View
      style={styles.container}>
      <Text>지갑 이름을 입력하세요.</Text>
      <TextInput
        label='Wallet'
        value={ walletName }
        onChangeText={ text => setWalletName(text) }>
      </TextInput>
      <Button 
        title="Register"
        onPress={ () => registerWallet(walletName) } />
    </View>
  );
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
  