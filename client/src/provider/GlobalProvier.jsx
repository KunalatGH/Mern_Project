import { createContext, useContext, useState } from "react";
import Axios from "../utils/Axios";
import SummaryAPI from "../common/SummaryAPI";
import { handleAddItemCart } from "../Store/cartProduct";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import handleAddAddress from '../Store/addressSlice'

export const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [noDiscountTotalPrice, setNoDiscountTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector((state) => state?.user);
  
  const dispatch = useDispatch();
  const fetchCartItem = async () => {
    try {
      const response = await Axios({
        ...SummaryAPI.getCartItem,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(handleAddItemCart(responseData.data));
      }
    } catch (error) {
      return error;
    }
  };

  const updateCartItem = async (id, qty) => {
    try {
      const response = await Axios({
        ...SummaryAPI.updateCartItemQty,
        data: {
          _id: id,
          qty: qty,
        },
      });
      const { data: responseData } = response;

      if (responseData.success) {
        // toast.success(responseData.message)
        fetchCartItem();
        return responseData;
      }
    } catch (error) {
      AxiosToastError(error);
      return error;
    }
  };

  const deleteCartItem = async (cartId) => {
    try {
      const response = await Axios({
        ...SummaryAPI.deleteCartItem,
        data: {
          _id: cartId,
        },
      });
      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItem();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  useEffect(() => {
    fetchCartItem();
  }, []);

  useEffect(() => {
    const qty = cartItem.reduce((preve, curr) => {
      return preve + curr.quantity;
    }, 0);
    setTotalQty(qty);

    const tPrice = cartItem.reduce((preve, curr) => {
      const priceAfterDiscount = pricewithDiscount(
        curr?.productId?.price,
        curr?.productId?.discount
      );
      return preve + (priceAfterDiscount * curr.quantity);
    }, 0);
    setTotalPrice(tPrice);

    const noDiscountPrice = cartItem.reduce((preve, curr) => {
      return preve + (curr?.productId?.price * curr.quantity);
    },0)
    setNoDiscountTotalPrice(noDiscountPrice);
  }, [cartItem]);
  
  
  const handleLogOut = () => {
    localStorage.clear();
    dispatch(handleAddItemCart([]));
  }
  

  const fetchAddress = async () => {
    try {
        const response = await Axios({
          ...SummaryAPI.getAddress
        })
        const { data : responseData } = response

        if(responseData.success){
          dispatch(handleAddAddress(responseData.data))
        }
      } catch (error) {
          // AxiosToastError(error)
      }
  }
  // console.log(fetchAddress);

  useEffect(() => {
    fetchCartItem();
    handleLogOut();
    fetchAddress();
  },[user]);
  
  return (
    <GlobalContext.Provider
      value={{
        fetchCartItem,
        updateCartItem,
        deleteCartItem,
        fetchAddress,
        totalPrice,
        totalQty,
        noDiscountTotalPrice
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
