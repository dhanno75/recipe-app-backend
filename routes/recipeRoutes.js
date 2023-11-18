import { auth } from "../controllers/userController.js";
import express from "express";
import {
  createRecipe,
  deleteRecipe,
  editRecipe,
  favoriteARecipe,
  getAllRecipes,
} from "../controllers/recipeController.js";

const router = express.Router();

router.route("/").post(auth, createRecipe).get(getAllRecipes);
router.route("/:recipeID").put(auth, favoriteARecipe);
router.route("/:rid").patch(auth, editRecipe).delete(auth, deleteRecipe);

export default router;
