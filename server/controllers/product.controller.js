import ProductModel from "../models/product.model.js";

//createProductController

export const createProductController = async(req, res) => {
  try {
    const {
      name,image,category,subcategory,unit,
      stock,price,discount,description,
      more_details,
    } = req.body;

    if (
      !name ||!image[0] ||
      !category[0] ||!subcategory[0] ||
      !unit ||
      !stock ||!price ||
      !discount ||!description){
      return res.status(400).json({ 
        message: "Please fill all the fields." ,
        error : true,
        success : false
    });
    }

    const product = new ProductModel({
        name,image,
        category,subcategory,
        unit,stock,price,
        discount,description,
        more_details
        });

        const savedProduct = await product.save();

        return res.json({
            message: "Product created successfully",
            error: false,
            success: true,
            data: savedProduct
            });

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getProductController = async(req,res)=>{
  try {
    let { page, limit, search } = req.body
    if(!page){
      page = 2
    }
    if(!limit){
      limit = 10
    }
    const query = search ? {
      $text : {
        $search : search
      }
    }: {}

    const skip = ( page - 1) * limit

    const [data, totalCount] = await Promise.all([
      ProductModel.find(query).sort({createdAt : -1}).skip(skip).limit(limit).populate('category subcategory'),
      ProductModel.countDocuments(query)
    ])

    return res.json({
      message: "Product Data",
      error: false,
      success: true,
      totalCount: totalCount,
      totalNoPage : Math.ceil( totalCount/limit),
      data: data
    })


  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
      });
  }
}

export const getProductByCategory = async(request,response)=>{
  try {
        const { id } = request.body 

        if(!id){
            return response.status(400).json({
                message : "provide category id",
                error : true,
                success : false
            })
        }

        const product = await ProductModel.find({ 
            category : { $in : id }
        }).limit(15)

        return response.json({
            message : "category product list",
            data : product,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getProductByCategoryAndSubCategory  = async(request,response)=>{
    try {
        const { categoryId,subCategoryId,page,limit } = request.body  
        if(!categoryId || !subCategoryId){
            return response.status(400).json({
                message : "Provide categoryId and subCategoryId",
                error : true,
                success : false
            })
        }

        if(!page){
            page = 1
        }

        if(!limit){
            limit = 10
        }

        const query = {
            category : { $in :[categoryId]  },
            subcategory : { $in : [subCategoryId] }
        }

        const skip = (page - 1) * limit

        const [data,dataCount] = await Promise.all([
            ProductModel.find(query).sort({createdAt : -1 }).skip(skip).limit(limit),
            ProductModel.countDocuments(query)
        ])
        return response.json({
            message : "Product list",
            data : data,
            totalCount : dataCount,
            page : page,
            limit : limit,
            success : true,
            error : false
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getProductDetails = async(request,response)=>{
    try {
        const { productId } = request.body 

        const product = await ProductModel.findOne({ _id : productId })


        return response.json({
            message : "product details",
            data : product,
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const updateProductDetails = async(request,response)=>{
    try {
        const { _id } = request.body 

        if(!_id){
            return response.status(400).json({
                message : "provide product _id",
                error : true,
                success : false
            })
        }

        const updateProduct = await ProductModel.updateOne({ _id : _id },{
            ...request.body
        })

        return response.json({
            message : "updated successfully",
            data : updateProduct,
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const deleteProductDetails = async(request,response)=>{
    try {
        const { _id } = request.body 

        if(!_id){
            return response.status(400).json({
                message : "provide _id ",
                error : true,
                success : false
            })
        }

        const deleteProduct = await ProductModel.deleteOne({_id : _id })

        return response.json({
            message : "Delete successfully",
            error : false,
            success : true,
            data : deleteProduct
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const searchProduct = async(request,response)=>{
    try {
        let { search, page , limit } = request.body 

        if(!page){
            page = 1
        }
        if(!limit){
            limit  = 10
        }

        const query = search ? {
            $text : {
                $search : search
            }
        } : {}

        const skip = ( page - 1) * limit

        const [data,dataCount] = await Promise.all([
            ProductModel.find(query).sort({ createdAt  : -1 }).skip(skip).limit(limit).populate('category subcategory'),
            ProductModel.countDocuments(query)
        ])

        return response.json({
            message : "Product data",
            error : false,
            success : true,
            data : data,
            totalCount :dataCount,
            totalPage : Math.ceil(dataCount/limit),
            page : page,
            limit : limit 
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

