import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import categoriesApi from '../api/categories.api';
import productsApi from '../api/products.api';
import {Item, SearchInput, ButtonCategory} from '../components';

export const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [term, setTerm] = useState('');
  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  useEffect(() => {
    if (term) {
      const newProductsFiltered = allProducts.filter((product: any) =>
        product.title.toLowerCase().includes(term),
      );
      setProducts(newProductsFiltered);
    }
    if (term.length === 0) {
      setProducts(allProducts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  const getCategories = async () => {
    try {
      const response = await categoriesApi.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const getProducts = async () => {
    try {
      setIsRefreshing(true);
      const response = await productsApi.get('/products');
      setProducts(response.data);
      setIsRefreshing(false);
      setAllProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
      setIsRefreshing(false);
      setLoading(false);
    }
  };

  const getProductsByCategory = async (category: string) => {
    try {
      const response = await categoriesApi.get(`/category/${category}`);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };
  if (products.length <= 0) {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleClick = (category: string) => {
    setLoading(true);
    if (category === 'all') {
      getProducts();
    } else {
      getProductsByCategory(category);
    }
  };

  if (loading) {
    return (
      <View style={styles.mainContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.mainContainer}>
      {/* Searchbar */}
      <View style={styles.containerHeader}>
        <View style={styles.search}>
          <SearchInput onDebounce={value => setTerm(value)} />
        </View>
      </View>
      {/* Categories List */}
      <View style={styles.containerCategories}>
        <ScrollView
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.container}>
            <ButtonCategory
              category={'all'}
              key={'5'}
              onClick={value => handleClick(value)}
            />
            {categories.map(category => (
              <ButtonCategory
                category={category}
                key={category}
                onClick={value => handleClick(value)}
              />
            ))}
          </View>
        </ScrollView>
      </View>
      {/* product List */}
      <View>
        {products.map((item: any) => (
          <Item
            name={item.title}
            source={item.image}
            id={item.id}
            rating={item.rating.rate}
            key={item.id}
          />
        ))}
        {/* <FlatList
          data={products}
          numColumns={1}
          keyExtractor={(item: any) => item.id}
          renderItem={({item}: any) => (
            <Item
              name={item.title}
              source={item.image}
              id={item.id}
              rating={item.rating.rate}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={getProducts} />
          } */}
        {/* /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 10,
    flex: 1,
    height: '100%',
  },
  containerCategories: {
    marginVertical: 20,
  },
  containerHeader: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 30,
  },
  search: {
    width: '80%',
  },
  burger: {
    width: '20%',
  },
  loading: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  categoryContainer: {
    width: 140,
    display: 'flex',
  },
});
