const Category = require("../Models/category");

exports.addCategory = async (req, res) => {
  try {
    const {name} = req.body;
    if(!name){
      return res.status(400).json({message: "Name is required"})
    }
    if(typeof name !== 'string'){
      return res.status(400).json({message: "Name must be a string"})
    }
    const category = await Category.create({
      name
    });
    res.status(201).json({
      status: "success",
      data: {
        category,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if(!categories){
      return res.status(404).json({message: "No categories found"});
    }
    res.status(200).json({
      status: "success",
      data: {
        categories,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        status: "fail",
        message: "category not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        category,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.editCategory = async (req,res) =>{
  try{
    const { id } = req.params.id;
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(id,{
      name:name
    },{new : true});

    return res.status(200).json({
      status: 'success',
      data : category
    })

  }catch(err){
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
}

exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    await Category.findByIdAndDelete(id);
    res.status(204).json({
      status: "success",
      data: {
        message: "category deleted successfully",
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};