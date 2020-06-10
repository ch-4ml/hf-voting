import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-fetch-blob';

const walletPath = RNFS.DownloadDirectoryPath + '/wallet';

query = async (title) => {
  try {
    let id;
    const files = await RNFS.readDir(`${walletPath}/${title}`);
    files.map(file => {
      if(file.name.indexOf('-') === -1) id = file.name;
    });

    const response = await RNFetchBlob.fetch('POST', 'http://fetch3.ddns.net:3000/query', {
      'Content-Type': 'multipart/form-data'
    }, [{ name: 'file', filename: `${id}.zip`, type: 'application/zip', data: RNFetchBlob.wrap(`${walletPath}/${title}.zip`) }])
    const json = await(response.json());
    console.log(json);
    return json;
  } catch (err) {
    console.log(err);
  }
}

Item = ({title, navigation}) => {

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('FabcarQueryTest', { carData: query(title) })}>
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default WalletList = ({navigation}) => {

  const [ data, setData ] = useState(null);

  useEffect(() => {
    const walletList = [];
    RNFS.readDir(RNFS.DownloadDirectoryPath + '/wallet').then(dirs => {
      dirs.map((dir) => {
        if(dir.name.indexOf('.zip') === -1) walletList.push({ title: dir.name });
      })
    }).catch(err => {
      console.log(err);
    });
    setData(walletList);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={ data }
        renderItem={({ item }) => <Item title={item.title} navigation={navigation} /> }
        keyExtractor={ item => item.title }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    borderBottomColor: '#E7E7E7',
    borderBottomWidth: 1,
    padding: 20,
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    fontSize: 24,
  },
});
  