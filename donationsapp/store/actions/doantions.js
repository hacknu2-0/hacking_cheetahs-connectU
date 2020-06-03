import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch,getState) => {
    // any async code you want!
    const userId=getState().auth.userId
    try {
      const response = await fetch(
        'https://fir-donation-99442.firebaseio.com/donations.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].address,
            resData[key].description,
            
            resData[key].landmark,
            resData[key].timetopickup,
            resData[key].datetopickup,
            resData[key].mobileno,


            
          )
        );
      }

      dispatch({ type: SET_PRODUCTS, products: loadedProducts,userProducts:loadedProducts.filter(prod=>prod.ownerId===userId) });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const deleteProduct = productId => {
  return async (dispatch,getState) => {
    const token = getState().auth.token
    const response = await fetch(
      `https://fir-donation-99442.firebaseio.com/donations/${productId}.json?auth=${token}`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (title, description, address, landmark,timetopickup,datetopickup,mobileno) => {
  return async (dispatch,getState) => {
    // any async code you want!
    const token = getState().auth.token
    const userId =getState().auth.userId
    const response = await fetch(
      `https://fir-donation-99442.firebaseio.com/donations.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          address,
          
          landmark,
          timetopickup,
          datetopickup,
          mobileno,
          ownerId:userId
          
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        address,
        
        landmark,
        timetopickup,
        datetopickup,
        mobileno,
        ownerId:userId
        
      }
    });
  };
};

export const updateProduct = (id, title, description, address,landmark,timetopickup,datetopickup,mobileno) => {
  return async (dispatch,getState) => {
    const token=getState().auth.token
    const response = await fetch(
      `https://fir-donation-99442.firebaseio.com/donations/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          address,
          landmark,
          timetopickup,
          datetopickup,
          mobileno
          
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        address,
        landmark,
        timetopickup,
        datetopickup,
        mobileno
        
      }
    });
  };
};
