import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";


// create category 
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category Already Exisits",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category",
    });
  }
};

//update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "category Updated successfully",
      category,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "error in updating category",
        error,
      });
  }
};


// get all categories 
export const categoryController = async (req,res) => {
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:"all categories list",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error in getting all categories"
        })
    }
}

// single category Controller
export const singleController = async (req,res) => {
    try {
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:"single category",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in getting single category",
            error,
        })
    }
}

// delete category
export const deleteController = async ( req,res ) => {
    try {
        const { id } = req.params;
        const category = await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
          success: true,
          message: "category deleted successfully",
          category,
        });
      } catch (error) {
        console.log(error),
        res.status(500).send({
            success:false,
            message:"error in deleting category",
            error,
        })
    }
}