/* eslint-disable no-unused-vars */
import React from "react";
import {
  Link,
  Navigate,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import UserMenu from "../UserMenu/UserMenu";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useGlobalContext } from "../../../provider/GlobalProvier";
import { DisplayPriceInRupees } from "../../../utils/DisplayPriceInRupees";
import DisplayCartItems from "../DisplayCartItems/DisplayCartItems";

function Header() {
  const cartItem = useSelector((state) => state.cartItem.cart);

  // const [totalPrice,setTotalPrice] = useState(0)
  // const [totalQty,setTotalQty] = useState(0)


  const { totalPrice, totalQty } = useGlobalContext();



  const [openCartSection, setOpenCartSection] = useState(false);
  let navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const params = useLocation();
  const searchText = params.search.slice(3);

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login");
      return;
    }
    navigate("/user");
  };

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    const url = `/search?q=${value}`;
    navigate(url);
  };

  //total item and total price
    // useEffect(()=>{
    //     const qty = cartItem.reduce((preve,curr)=>{
    //         return preve + curr.quantity
    //     },0)
    //     setTotalQty(qty)
        
    //     const tPrice = cartItem.reduce((preve,curr)=>{
    //         return preve + (curr.productId.price * curr.quantity)
    //     },0)
    //     setTotalPrice(tPrice)

    // },[cartItem])

  return (
  //   <div className="p-3  w-full h-20 flex items-center justify-between bg-amber-600 z-40 ">
  //     <div className="flex w-150  items-center justify-start -space-x-3">
  //       <div id="logo" className="flex items-center w-20 h-10 flex-shrink-0 ">
  //         <img
  //           className="w-10 h-10 object-cover rounded-4xl drop-shadow-lg "
  //           src="https://images.unsplash.com/photo-1588155664232-8aa20befe9e7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnVyZ2VyJTIwbG9nb3xlbnwwfHwwfHx8Mg%3D%3D"
  //           alt=""
  //         />
  //       </div>
  //       <div
  //         // to="/search"
  //         id="searchbar"
  //         className="flex items-center w-40 lg:w-70 h-9 flex-shrink-0 "
  //       >
  //         <input
  //           onClick={redirectToSearchPage}
  //           onChange={handleOnChange}
  //           defaultValue={searchText}
  //           type="text"
  //           placeholder="Search"
  //           className="text-black bg-pink-300 px-2 h-full w-full rounded-start-0 rounded-2xl drop-shadow-lg"
  //         />
  //       </div>
  //     </div>

  //     <div className="ml-2 sm:hidden flex justify-end w-7xl h-fit ">
  //       <button
  //         className="text-4xl p-2 rounded-full drop-shadow-lg "
  //         onClick={handleMobileUser}
  //       >
  //         <CgProfile />
  //       </button>
  //     </div>

  //     <div className="flex w-150 h-8 drop-shadow-lg ">
  //       <ul className="w-full h-auto justify-around hidden sm:flex items-center font-medium ">
  //         <li>
  //           <NavLink
  //             to="/home"
  //             className={({ isActive }) =>
  //               `block py-2 pr-4 pl-3 duration-400   ${
  //                 isActive ? "text-white font-bold border-b " : "text-black-500"
  //               } hover:text-white `
  //             }
  //           >
  //             Home
  //           </NavLink>
  //         </li>

  //         <li>
  //           <NavLink
  //             to="/offer"
  //             className={({ isActive }) =>
  //               `block py-2 pr-4 pl-3 duration-200  ${
  //                 isActive ? "text-white font-bold border-b " : "text-black-500"
  //               } hover:text-white`
  //             }
  //           >
  //             Offer
  //           </NavLink>
  //         </li>
  //       </ul>

  //       <div className=" hidden sm:flex items-center  justify-center drop-shadow-lg ">
  //         {user?._id ? (
  //           <button className="relative  w-30 h-9  rounded-5 drop-shadow-lg">
  //             <div
  //               className=" items-center hidden sm:flex justify-between w-full h-full p-2"
  //               onClick={() => setOpenUserMenu((prev) => !prev)}
  //             >
  //               Account
  //               <div className=" top-2 right-2 ">
  //                 {openUserMenu ? <IoIosArrowUp /> : <IoIosArrowDown />}
  //               </div>
  //               {openUserMenu && (
  //                 <div className="absolute top-14 right-0 h-6 ">
  //                   <div className="bg-white rounded-2xl p-2 min-w-42 lg:shadow-2xl-lg">
  //                     <UserMenu close={handleCloseUserMenu} />
  //                   </div>
  //                 </div>
  //               )}
  //             </div>
  //           </button>
  //         ) : (
  //           <button className="rounded-2xl border-2 w-30 h-9 rounded-5 drop-shadow-lg">
  //             <NavLink to="/login" className="">
  //               Login
  //             </NavLink>
  //           </button>
  //         )}

  //         <button
  //           onClick={() => setOpenCartSection(true)}
  //           className="flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 rounded text-white"
  //         >
  //           {/**add to card icons */}
  //           {/* <div className="animate-bounce">
  //             <BsCart4 size={26} />
  //           </div> */}
  //           <div className="font-semibold text-sm">
  //             {cartItem[0] ? (
  //               <div>
  //                 <p>{totalQty} Items</p>
  //                 <p>{DisplayPriceInRupees(totalPrice)}</p>
  //               </div>
  //             ) : (
  //               <p>My Cart</p>
  //             )}
  //           </div>
  //         </button>

  //         <button className="bg-pink-300 w-30 h-9 ml-2 hidden  sm:block rounded-5 drop-shadow-lg">
  //           <NavLink to="/register" className="">
  //             Register Now
  //           </NavLink>
  //         </button>
  //       </div>
  //     </div>
  //     {
  //   openCartSection && (
  //     <DisplayCartItems close={()=>setOpenCartSection(false)}/>
  //   )
  // }
  //   </div>

  <div className="bg-white shadow-md border-b border-gray-200 p-4 w-full h-16 flex items-center justify-between z-40">
  <div className="flex items-center gap-4">
    {/* Logo */}
    <div className="flex items-center gap-2">
      <img
        className="w-10 h-10 object-cover rounded-full shadow-sm"
        src="https://images.unsplash.com/photo-1588155664232-8aa20befe9e7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnVyZ2VyJTIwbG9nb3xlbnwwfHwwfHx8Mg%3D%3D"
        alt="Logo"
      />
      <span className="font-bold text-xl text-gray-800 hidden sm:block">FoodApp</span>
    </div>
    
    {/* Search Bar */}
    <div className="relative">
      <input
        onClick={redirectToSearchPage}
        onChange={handleOnChange}
        defaultValue={searchText}
        type="text"
        placeholder="Search for food, restaurants..."
        className="w-64 lg:w-80 h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      />
      <svg className="absolute left-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  </div>

  {/* Mobile Menu Button */}
  <div className="sm:hidden">
    <button
      className="text-gray-600 hover:text-gray-800 p-2"
      onClick={handleMobileUser}
    >
      <CgProfile className="w-6 h-6" />
    </button>
  </div>

  {/* Desktop Navigation */}
  <div className="hidden sm:flex items-center gap-6">
    <nav className="flex items-center gap-6">
      <NavLink
        to="/home"
        className={({ isActive }) =>
          `px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${
            isActive ? "text-orange-600 bg-orange-50" : "text-gray-600 hover:text-orange-600"
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/offer"
        className={({ isActive }) =>
          `px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${
            isActive ? "text-orange-600 bg-orange-50" : "text-gray-600 hover:text-orange-600"
          }`
        }
      >
        Offers
      </NavLink>
    </nav>

    {/* User Account */}
    {user?._id ? (
      <div className="relative">
        <button
          className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 font-medium"
          onClick={() => setOpenUserMenu((prev) => !prev)}
        >
          Account
          {openUserMenu ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
        {openUserMenu && (
          <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg border border-gray-200 min-w-48 z-50">
            <UserMenu close={handleCloseUserMenu} />
          </div>
        )}
      </div>
    ) : (
      <NavLink
        to="/login"
        className="px-4 py-2 text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition-colors duration-200 font-medium"
      >
        Login
      </NavLink>
    )}

    {/* Cart Button */}
    <button
      onClick={() => setOpenCartSection(true)}
      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white font-medium transition-colors duration-200"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8" />
      </svg>
      {cartItem[0] ? (
        <div className="text-sm">
          <span>{totalQty} Items</span>
          <span className="ml-2">{DisplayPriceInRupees(totalPrice)}</span>
        </div>
      ) : (
        <span>Cart</span>
      )}
    </button>

    <NavLink
      to="/register"
      className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors duration-200"
    >
      Register
    </NavLink>
  </div>

  {openCartSection && (
    <DisplayCartItems close={() => setOpenCartSection(false)} />
  )}
</div>
  );

  
}

export default Header;
