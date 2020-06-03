import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Alert,
  ImageBackground
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/style/ProductItem';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/doantions';

const UserProductsScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();
  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productsActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadProducts
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && userProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No Donations found. Maybe start adding some!</Text>
      </View>
    );
  }

  const editProductHandler = id => {
    props.navigation.navigate('EditProduct', { productId: id });
  };

  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to cancel your donation?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(productsActions.deleteProduct(id));
        }
      }
    ]);
  };
 

  return (
   
    <ImageBackground source={require('../../assets/download.jpg')}
    style={styles.container}>

    
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
    
        <ProductItem
          address={itemData.item.address}
          title={itemData.item.title}
          
          description={itemData.item.description}
          landmark={itemData.item.landmark}
          timetopickup={itemData.item.timetopickup}
          datetopickup={itemData.item.datetopickup}
          mobileno={itemData.item.mobileno}
          
          
          
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <Button
            color='black'
            title="Edit "
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color='black'
            title="Cancel "
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </ProductItem>
        
       
      )}
    />
    </ImageBackground>
  );
};

UserProductsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Donations',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => {
            navData.navigation.navigate('EditProduct');
          }}
        />
      </HeaderButtons>
      
    )
  };
};
const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: {
    flex: 1,
  
    width:'100%',
    height:'100%'
  
},
});

export default UserProductsScreen;
