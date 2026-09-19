import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import {
  createProduct,
  getProducts,
  getFeaturedProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../Controllers/product.js";

import authMiddleware from "../middleware/authmiddleware.js";
import adminMiddleware from "../middleware/adminmiddleware.js";

const router = express.Router();

/*
  ========================================
  ACV PLUS PRODUCT IMAGE UPLOAD SETUP
  ========================================
*/

const uploadDirectory = path.join(
  process.cwd(),
  "uploads",
  "products"
);

/*
  Create product upload directory
  if it does not already exist.
*/
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, {
    recursive: true,
  });
}

/*
  ========================================
  MULTER STORAGE CONFIGURATION
  ========================================
*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (req, file, cb) => {
    /*
      Supported examples:

      Product image:
      acvplus-product-1789743829123-482193721.webp

      Ingredient label:
      acvplus-ingredient-1789743829123-482193721.webp
    */

    const mimeExtensionMap = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/webp": ".webp",
    };

    const extension =
      mimeExtensionMap[file.mimetype] ||
      path.extname(file.originalname).toLowerCase();

    const uniqueSuffix = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}`;

    const prefix =
      file.fieldname === "ingredientImage"
        ? "acvplus-ingredient"
        : "acvplus-product";

    cb(
      null,
      `${prefix}-${uniqueSuffix}${extension}`
    );
  },
});

/*
  ========================================
  FILE TYPE VALIDATION
  ========================================

  Applies to:
  - Product images
  - Ingredient label image
*/
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(
      new Error(
        "Only JPG, JPEG, PNG and WEBP images are allowed."
      ),
      false
    );
  }

  /*
    Only allow the image fields expected
    by the ACV Plus frontend.
  */
  const allowedFields = [
    "images",
    "ingredientImage",
  ];

  if (!allowedFields.includes(file.fieldname)) {
    return cb(
      new Error(
        `Unexpected image field: ${file.fieldname}`
      ),
      false
    );
  }

  return cb(null, true);
};

/*
  ========================================
  PRODUCT IMAGE UPLOAD LIMITS
  ========================================

  Maximum:
  - 4 normal product images
  - 1 ingredient label image
  - 5 MB per individual image
  - 5 files total per request
*/
const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 5,
  },
});

/*
  ========================================
  PRODUCT UPLOAD FIELDS
  ========================================

  Frontend sends:

  images
  -> Maximum 4 normal product images

  ingredientImage
  -> Maximum 1 ingredient / Supplement
     Facts label image
*/
const productImageUpload = upload.fields([
  {
    name: "images",
    maxCount: 4,
  },
  {
    name: "ingredientImage",
    maxCount: 1,
  },
]);

/*
  ========================================
  PUBLIC PRODUCT ROUTES
  ========================================

  Important:
  /featured must remain before /:id
*/

/*
  GET FEATURED PRODUCTS

  Used on the ACV Plus homepage.
*/
router.get(
  "/featured",
  getFeaturedProducts
);

/*
  GET ALL PRODUCTS

  Main endpoint used by the
  ACV Plus "Shop All" page.

  No category filtering is required.
*/
router.get(
  "/",
  getProducts
);

/*
  GET SINGLE PRODUCT
*/
router.get(
  "/:id",
  getProductById
);

/*
  ========================================
  ADMIN PRODUCT ROUTES
  ========================================
*/

/*
  CREATE PRODUCT

  Accepts:
  - Up to 4 product images
  - Up to 1 ingredient label image
*/
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  productImageUpload,
  createProduct
);

/*
  UPDATE PRODUCT

  Accepts:
  - Up to 4 new product images
  - Up to 1 new ingredient label image

  Existing image handling is performed
  inside the product controller.
*/
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  productImageUpload,
  updateProduct
);

/*
  DELETE PRODUCT
*/
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteProduct
);

export default router;