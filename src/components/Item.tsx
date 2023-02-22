/* eslint-disable react/react-in-jsx-scope */
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Text, View, Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {
  id: string;
  name: string;
  source: string;
  rating: string;
}
export const Item = ({name, source, id, rating}: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.item}>
      <Image source={{uri: source}} style={styles.image} />
      <View style={styles.txtDetail}>
        <View>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.productName}>
            {name}
          </Text>
          <View style={styles.containerRating}>
            <Image
              source={require('../assets/estrella.png')}
              style={styles.ratingImg}
            />

            <Text style={styles.rating}>{rating}</Text>
          </View>
        </View>
        {/* keyof ProductsStackParams nos da acceso a HomeScreen y DetailScreen de ProductStacParams */}
        <TouchableOpacity
          style={styles.buttonDetail}
          onPress={() => {
            navigation.dispatch(
              CommonActions.navigate('DetailScreen', {
                id,
              }),
            );
          }}>
          <Text style={styles.txtDetails}>Ver detalle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ratingImg: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  containerRating: {
    display: 'flex',
    flexDirection: 'row',
  },
  txtDetails: {
    color: 'white',
  },
  buttonDetail: {
    backgroundColor: '#D3B398',
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  rating: {
    color: '#FFBB56',
  },
  item: {
    flex: 1,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  txtDetail: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  image: {
    height: 120,
    resizeMode: 'cover',
    width: '50%',
  },
});
