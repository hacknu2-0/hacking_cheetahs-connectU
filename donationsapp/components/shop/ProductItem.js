import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  ModalDropdown
} from 'react-native';

import Card from '../UI/Card';

const ProductItem = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            
            <View style={styles.details}>
            
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.title}>{props.address}</Text>
              
              <Text style={styles.title}>{props.description}</Text>
              
              <Text style={styles.title}>{props.landmark}</Text>
              
              <Text style={styles.title}>{props.timetopickup}</Text>
              
              <Text style={styles.title}>{props.datetopickup}</Text>
              <Text style={styles.title}>{props.mobileno}</Text>
             

            </View>
            <View style={styles.actions}>
              {props.children}
            </View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  container:{
    
    justifyContent:'flex-end',
    
    

  },

  details: {
    alignItems: 'center',
    height: '77%',
    padding: 10
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    marginVertical: 2
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: '#888'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20
  }
});

export default ProductItem;
