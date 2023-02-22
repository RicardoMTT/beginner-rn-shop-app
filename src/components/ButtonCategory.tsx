import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet, Text, View} from 'react-native';
interface Props {
  onClick: (value: string) => void;
  category: string;
}
export const ButtonCategory = ({category, onClick}: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        key={category}
        onPress={() => onClick(category)}
        style={styles.categoryContainer}>
        <Text style={styles.textTouchable}>{category}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTouchable: {
    color: 'white',
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#D3B398',
    marginHorizontal: 10,
    borderRadius: 30,
  },
  categoryContainer: {
    width: 140,
    display: 'flex',
  },
});
