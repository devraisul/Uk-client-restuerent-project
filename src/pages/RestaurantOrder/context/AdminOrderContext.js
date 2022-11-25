import { createContext, useEffect, useRef, useState } from "react";
import { getdish, getDishById } from "../../../Apis/dish";
import { getVariationByDishId } from "../../../Apis/variation";

export const AdminOrderContext = createContext([])


const AdminOrderProvider = ({ children }) => {
  // TABLE 
  const [selectedTable, setSelectedTable] = useState()
  // MENU 
  const [menus, setMenus] = useState([])
  const [menuQuery, setMenuQuery] = useState("")
  const [activeMenuId, setActiveMenuId] = useState()
  const [isMenuLoading, setIsMenuLoading] = useState(false)
  // DISH 
  const [dishes, setDishes] = useState([])
  const [setselectedDishId, setsetselectedDishId] = useState()
  const [dishQuery, setDishQuery] = useState()
  const [isDishLoading, setIsDishLoading] = useState(false)
  // VARIATION
  const [dishVariations, setDishVariations] = useState([])
  const [selectedVariations, setSelectedVariations] = useState([])
  const [variationModalIsOpened, setvariationModalIsOpened] = useState(false)
  // CART 
  const [cartData, setCartData] = useState([])


  // PRINT REF
  const prntComponentRef = useRef()


  // HANDELER_FUNCTINS 
  const handleMenuClick = (id) => {
    setIsDishLoading(true)
    setActiveMenuId(id)
    getdish(id).then(dish => {
      setDishes(dish);
      setIsDishLoading(false)
    })
  }
  const handleDishClick = (id) => {
    setsetselectedDishId(id)
    getVariationByDishId(id).then((res) => {

      if (res?.data.length === 0) {

        getDishById(id).then(dis => {
          setCartData([...cartData, { dish_id: dis?.id, dish: dis, qty: 1, variation: [] }]);
        })
      } else {
        setDishVariations(res?.data)
        setvariationModalIsOpened(true)
      }
    }).catch(err => console.log(err))
  }
  const handleMenuSearchInput = (e) => {
    setMenuQuery(e.target.value)
  }
  const handleDishSearchInput = (e) => {
    setDishQuery(e.target.value)
  }
  const addToCartWithVariation = () => {
    getDishById(setselectedDishId).then(dis => {
      setCartData([...cartData, { dish_id: dis?.id, qty: 1, dish: dis, variation: selectedVariations }]);
      setSelectedVariations([])
    }).then(() => {
      setvariationModalIsOpened(false)
    })
  }
  const removeFromCart = (id) => {
    console.log({ id, cartData });
    setCartData(cartData.filter(data => data?.dish?.id !== id))
  }
  const handleAddVariation = (type_id,variation) => {
    (selectedVariations.length === 0) ?
      setSelectedVariations([...selectedVariations, {type_id,variation}])
      :
      (selectedVariations.filter(singleVar => 
        singleVar?.id === variation?.id).length === 0) ? setSelectedVariations([...selectedVariations, {type_id,variation}]) : setSelectedVariations(selectedVariations.filter(singleVar => singleVar?.consolevariation?.id !== variation?.id))
  }
  const handleRemoveVariation = (variation) => {
    setSelectedVariations(selectedVariations.filter(variations => variations?.variation?.id !== variation?.id))
  }

  const addCartDishQty = (id) => {
    console.log(cartData.find(dish => dish?.id === id));
  }

  const removeCartDishQty = (id) => {
    console.log(cartData.find(dish => dish?.id === id));
  }
  useEffect(() => { console.log(cartData); }, [cartData])

  const providerValue = {
    cartData,
    setCartData,
    selectedTable,
    setSelectedTable,
    isMenuLoading,
    setIsMenuLoading,
    isDishLoading,
    setIsDishLoading,
    menus,
    setMenus,
    dishes,
    setDishes,
    dishQuery,
    setDishQuery,
    menuQuery,
    setMenuQuery,
    activeMenuId,
    setActiveMenuId,
    handleMenuClick,
    handleDishClick,
    handleMenuSearchInput,
    handleDishSearchInput,
    variationModalIsOpened,
    setvariationModalIsOpened,
    handleAddVariation,
    handleRemoveVariation,
    dishVariations,
    setDishVariations,
    addToCartWithVariation,
    removeFromCart,
    selectedVariations,
    prntComponentRef,
    setSelectedVariations,
    addCartDishQty,
    removeCartDishQty
  }

  return (
    <AdminOrderContext.Provider value={providerValue}>
      {children}
    </AdminOrderContext.Provider>
  )
}

export default AdminOrderProvider