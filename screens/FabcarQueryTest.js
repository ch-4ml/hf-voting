
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default FabcarQueryTest = () => {

    const [carData, setCarData] = React.useState(null);

    useEffect(() => {
      setCarData(carData);
    }, []);
  
    return (
      <View style={styles.container}>
        <FlatList
          data={ carData }
          renderItem={({ item }) => <Item title={item.Key} /> }
          keyExtractor={ item => item.Key }
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
    