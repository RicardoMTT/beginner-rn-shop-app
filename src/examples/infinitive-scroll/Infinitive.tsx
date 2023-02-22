import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import axios from 'axios';

export const Infinitive = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const getUsers = () => {
    setIsLoading(true);
    axios
      .get(`https://randomuser.me/api/?page=${currentPage}&results=10`)
      .then((res: any) => {
        setUsers([...users, ...res.data.results]);
        setIsLoading(false);
      });
  };

  const renderItem = (item: any) => {
    return (
      <View style={styles.itemWrapper}>
        <Image
          style={styles.itemImageStyle}
          source={{uri: item.item.picture?.large}}
        />
        <View style={styles.contentWrapperStyle}>
          <Text style={styles.txtNameStyle}>{item.item.name.firstName}</Text>
          <Text style={styles.txtEmailStyle}>{item.item.email}</Text>
        </View>
      </View>
    );
  };
  useEffect(() => {
    getUsers();
  }, [currentPage]);

  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };
  const loadMoreItem = () => {    
    setCurrentPage(currentPage + 1);
  };
  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={(item: any) => item.email}
      ListFooterComponent={renderLoader}
      onEndReached={loadMoreItem}
      onEndReachedThreshold={0}
    />
  );
};

const styles = StyleSheet.create({
  txtEmailStyle: {
    color: '#777',
  },
  txtNameStyle: {
    fontSize: 16,
  },
  itemWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#dddd',
  },
  itemImageStyle: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  contentWrapperStyle: {
    justifyContent: 'space-around',
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
});
