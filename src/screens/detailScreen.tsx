import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import productsApi from '../api/products.api';
// interface DetailScreenRouteParams {
//   id: string;
// }
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface Rating {
  rate: number;
  count: number;
}

export const DetailScreen = ({route, navigation}: any) => {
  const {id} = route.params;
  console.log('id', id);
  const [product, setProduct] = useState<Product>({
    id: 0,
    category: '',
    description: '',
    image: '',
    price: 0,
    rating: {
      count: 0,
      rate: 0,
    },
    title: '',
  });
  const getProduct = async (idProduct: string) => {
    try {
      const productResponse = await productsApi.get(`/products/${idProduct}`);
      setProduct(productResponse.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getProduct(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!product) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.containerMain}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Text> ---</Text>
        </TouchableOpacity>
        {product.image.length > 0 && (
          <Image source={{uri: product.image}} style={styles.image} />
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{product.title}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <View style={styles.imageRate}>
            <Image
              source={require('../assets/estrella.png')}
              style={styles.ratingImg}
            />
            <Text style={styles.rateTxt}>{product.rating.rate}</Text>
          </View>
          <Text style={styles.priceTxt}>$/.{product.price}</Text>
        </View>
        <View style={styles.containerDescription}>
          <Text style={styles.descriptiontxt}>Descripción</Text>
          <Text>{product.description}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textbutton}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rateTxt: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  priceTxt: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  imageRate: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerMain: {
    paddingHorizontal: 20,
  },
  textbutton: {
    color: 'white',
  },
  descriptiontxt: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 20,
  },
  containerDescription: {
    display: 'flex',
  },
  description: {
    fontWeight: '800',
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 20,
    textAlign: 'left',
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  arrow: {
    width: 30,
  },
  ratingImg: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  button: {
    backgroundColor: '#D3B398',
    width: 200,
    padding: 20,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
    alignSelf: 'center',
  },
  infoContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
});
