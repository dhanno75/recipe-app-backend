import Recipe from "../models/recipeModel.js";
import User from "../models/userModel.js";

export const createRecipe = async (req, res, next) => {
  try {
    const user = req.user;
    const { name, ingredients, instructions, imageUrl, cookingTime, category } =
      req.body;

    let newRecipe = await Recipe.create({
      name,
      ingredients,
      instructions,
      imageUrl,
      cookingTime,
      userOwner: user._id,
      category,
    });

    const updateCategory = res.status(201).json({
      status: "success",
      message: "Recipe created successfully",
      data: newRecipe,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong, please try after sometime.",
    });
  }
};

export const getAllRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find();

    res.status(200).json({
      status: "success",
      length: recipes.length,
      data: recipes,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong, please try after sometime.",
    });
  }
};

export const editRecipe = async (req, res, next) => {
  try {
    const updateRecipe = await Recipe.findByIdAndUpdate(
      req.params.rid,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: updateRecipe,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong, please try after sometime.",
    });
  }
};

export const favoriteARecipe = async (req, res, next) => {
  try {
    const recipes = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { favoriteRecipes: req.params.recipeID } },
      {
        new: true,
      }
    );

    res.status(200).json({
      status: "success",
      length: recipes.length,
      data: recipes,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong, please try after sometime.",
    });
  }
};

export const deleteRecipe = async (req, res, async) => {
  try {
    await Recipe.findByIdAndDelete(req.params.rid);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong, please try after sometime.",
    });
  }
};
