import React from "react";
import BurgerImg from "../Img/amirali-mirhashemian-sc5sTPMrVfk-unsplash.jpg"
import PizzaImg from "../Img/vit-ch-Oxb84ENcFfU-unsplash.jpg"
import PastaImg from "../Img/ben-lei-flFd8L7_B3g-unsplash.jpg"
import SushiImg from "../Img/derek-duran-Jz4QMhLvGgw-unsplash.jpg"
import TacosImg from "../Img/chad-montano-lP5MCM6nZ5A-unsplash.jpg"



const offers = [
  {
    id: 1,
    name: "Burger",
    price: "$5.99",
    img: BurgerImg,
  },
  {
    id: 2,
    name: "Pizza",
    price: "$8.99",
    img: PizzaImg,
  },
  {
    id: 3,
    name: "Pasta",
    price: "$6.49",
    img: PastaImg,
  },
  {
    id: 4,
    name: "Sushi",
    price: "$12.99",
    img: SushiImg,
  },
  {
    id: 5,
    name: "Tacos",
    price: "$4.99",
    img: TacosImg,
  },
  
];

function OfferPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center text-orange-600 mb-4">
        Today's Special Offers
      </h2>
      <div className="flex justify-between space-x-6 p-4">
        {offers.map((item) => (
          <div
            key={item.id}
            className="w-60 flex-shrink-0 bg-white shadow-lg rounded-xl p-4 hover:shadow-2xl transition"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
            <p className="text-gray-600">{item.price}</p>
            <button className="mt-3 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-700">
              Order Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OfferPage;
