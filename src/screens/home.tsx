import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';

const listData = [
  { key: 'Fade' },
  { key: 'Transition' },
  { key: 'CardTransition' },
  { key: 'BottomSheetCl' },
  { key: 'PanGestureAnimation' },
  { key: 'DecayAnimation' },
  { key: 'SpringAnimation' },
];

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={listData}
        renderItem={({ item }) => (
          <Text
            style={styles.item}
            onPress={() => navigation.navigate(item.key)}>
            {item.key}
          </Text>
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  item: {
    padding: 20,
    fontSize: 18,
    height: 44,
  },
});
