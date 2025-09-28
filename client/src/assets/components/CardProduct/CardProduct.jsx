import { valideURLConvert } from "../../../../../server/utils/valideURLConvert";
import { useState } from "react";
import { Link } from "react-router-dom";
import SummaryAPI from "../../../common/SummaryAPI";
SummaryAPI;
import toast from "react-hot-toast";
import { DisplayPriceInRupees } from "../../../utils/DisplayPriceInRupees";
import { pricewithDiscount } from "../../../utils/PriceWithDiscount";
import { useSelector } from "react-redux";
import AddToCartButton from "../AddToCartButton/AddToCartButton";

const CardProduct = ({ data }) => {
  //  const allCategory = useSelector(state => state.product.allCategory)
  //   const allSubCategory = useSelector(state => state.product.allSubCategory)

  //   // Find the category and subcategory objects
  //   const categoryObj = allCategory.find(c => c._id === data.category[0]);
  //   const subCategoryObj = allSubCategory.find(s => s._id === data.subcategory[0]);

  // Build the correct URL
  // const url = categoryObj && subCategoryObj
  //   ? `/product/${valideURLConvert(categoryObj.name)}-${categoryObj._id}/${valideURLConvert(subCategoryObj.name)}-${subCategoryObj._id}`
  //   : "#";
  const url = `/product/${valideURLConvert(data.name)}-${data._id}`;
  const [loading, setLoading] = useState(false);

  return (
    // <Link to={url} className='border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white' >
    //   <div className='min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden'>
    //         <img
    //             src={data.image[0]}
    //             className='w-full h-full object-scale-down lg:scale-125'
    //         />
    //   </div>
    //   <div className='flex items-center gap-1'>
    //     <div className='rounded text-xs w-fit p-[1px] px-2 text-green-600 bg-green-50'>
    //           10 min
    //     </div>
    //     <div>
    //         {
    //           Boolean(data.discount) && (
    //             <p className='text-green-600 bg-green-100 px-2 w-fit text-xs rounded-full'>{data.discount}% discount</p>
    //           )
    //         }
    //     </div>
    //   </div>
    //   <div className='px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2'>
    //     {data.name}
    //   </div>
    //   <div className='w-fit gap-1 px-2 lg:px-0 text-sm lg:text-base'>
    //     {data.unit} Unit

    //   </div>

    //   <div className='px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base'>
    //     <div className='flex items-center gap-1'>
    //       <div className='font-semibold'>
    //           {DisplayPriceInRupees(pricewithDiscount(data.price,data.discount))}
    //       </div>

    //     </div>
    //       <div className=''>
    //       {
    //         data.stock == 0 ? (
    //           <p className='text-red-500 text-sm text-center'>Out of stock</p>
    //         ) : (
    //           <AddToCartButton data={data} />
    //         )
    //       }

    //     </div>
    //   </div>

    // </Link>

    <Link
      to={url}
      className="border border-gray-200 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 p-4 grid gap-3 min-w-36 lg:min-w-52 rounded-2xl cursor-pointer bg-white group overflow-hidden"
    >
      <div className="relative min-h-20 w-full max-h-24 lg:max-h-32 rounded-xl overflow-hidden bg-white">
        <img
          src={data.image[0]}
          className="w-full h-full object-scale-down lg:scale-125 group-hover:scale-110 lg:group-hover:scale-135 transition-transform duration-300"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-lg">
            🚀 10 min
          </div>
          {Boolean(data.discount) && (
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
              {data.discount}% OFF
            </div>
          )}
        </div>

        <h3 className="font-semibold text-gray-900 text-sm lg:text-base line-clamp-2">
          {data.name}
        </h3>

        <p className="text-gray-500 text-xs lg:text-sm font-medium">
          {data.unit} Unit
        </p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="font-bold text-lg text-gray-900">
          {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
        </div>
        {data.stock == 0 ? (
          <div className="text-red-600 text-xs font-semibold bg-red-100 px-3 py-1.5 rounded-lg">
            Out of stock
          </div>
        ) : (
          <AddToCartButton data={data} />
        )}
      </div>
    </Link>
  );
};

export default CardProduct;
