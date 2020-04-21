import React from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {graphql} from 'react-apollo';

import {ALL_PRODUCTS} from "../queries";

const ProductsScreen = ({data: {products}, loading}) => {
  if (loading || !products) return <Text>Loading...</Text>;

  return (
    <View>
      <FlatList
        data={products.map(p => ({...p, key: p.id}))}
        renderItem={({item}) =>(
          <View style={styles.raw}>
            <Image style={styles.images} source={{ uri: `http://localhost:4000/${item.pictureUrl}`}}/>
            <View style={styles.right}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
          </View>
        ) }
      />
    </View>
  )
};

const styles = StyleSheet.create({
  images: {
    height: 100,
    width: 100,
  },
  raw: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
  },
  right: {
    flex: 1,
    marginLeft: 10,
    marginRight: 30,
    alignItems: 'flex-end'
  },
  name: {
    fontSize: 40
  },
  price: {
    fontSize: 30
  }
});

export default graphql(ALL_PRODUCTS)(ProductsScreen);