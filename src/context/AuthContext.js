import React, { useContext, useEffect } from 'react';

const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [laoding, setLoading] = React.useState(false);

  const logout = () => {
    const confirmation = window.confirm('Are you sure you want to logout?');
    if (confirmation) {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('data');
    };
  };

  useEffect(() => {
    setLoading(true);
    const data = localStorage.getItem('data');
    if (data) {
      setUser(JSON.parse(data))
      setIsAuthenticated(true);
    }
  }, []);
  useEffect(() => {
    setLoading(true);
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user))
    }
  }, []);
  const [product, setProduct] = React.useState({
    'Qty': 0,
    'Dish_Price': 0,
    'variation': null,
    'Key': Math.floor((Math.random() * 100) + 1),
  })
  const addproduct = (products, price, count, variation) => async (dispatch) => {

    if (variation) { variation.pop() }
    setProduct({
      'Qty': count,
      'Dish_Price': price,
      'variation': variation,
      'Key': Math.floor((Math.random() * 100) + 1),
    })

    try {
      setProduct({
        'Qty': count,
        'Dish_Price': price,
        'variation': variation,
        'Key': Math.floor((Math.random() * 100) + 1),
      })
    } catch (err) {
      console.log(err);
    };
  }

  const adduserdealproduct = (products, price, count, variation, dish) => {

    if (variation) { variation.pop() }
    //sort selected variations according to theri dish in string
    console.log("dish of deal")
    console.log(dish)
    var str = '';
    for (let i = 0; i < dish.length; i++) {
      str += `${dish[i].Dish_Name} : `
      for (let j = 0; j < variation.length; j++) {
        if (dish[i].Dish_Name === variation[j].Dish_Name) {
          str += `${variation[j].variation_Name.toString()}, `;
        }
      }
      str += '. '

    }
    setProduct({
      'Qty': count,
      'Dish_Price': price,
      'variation': str,
      'Key': Math.floor((Math.random() * 100) + 1),
    })
    try {

      if (products) {
        setProduct({
          'Qty': count,
          'Dish_Price': price,
          'variation': str,
          'Key': Math.floor((Math.random() * 100) + 1),
        })
      }
      // dispatch(setAlert('Dish Added ', 'success'));
    } catch (err) {
      console.log(err);
    };
  }
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, setIsAuthenticated, setUser, logout, laoding, adduserdealproduct, addproduct, product }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
