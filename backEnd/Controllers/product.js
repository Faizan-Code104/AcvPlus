import Product from "../models/Product.js";
import fs from "fs";
import path from "path";

/*
  ========================================
  ACV PLUS PRODUCT CONTROLLER
  ========================================
*/

/*
  Safely delete a local uploaded file.
*/
const deleteLocalFile = (filePath) => {
  try {
    if (!filePath || typeof filePath !== "string") {
      return;
    }

    if (!filePath.startsWith("/uploads/products/")) {
      return;
    }

    const absolutePath = path.join(
      process.cwd(),
      filePath.replace(/^\/+/, "")
    );

    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }
  } catch (error) {
    console.error(
      "Product File Delete Error:",
      error.message
    );
  }
};

/*
  Delete Multer-uploaded files when a
  database operation fails.
*/
const cleanupUploadedFiles = (files) => {
  if (!files || typeof files !== "object") {
    return;
  }

  const uploadedFiles = [
    ...(Array.isArray(files.images)
      ? files.images
      : []),

    ...(Array.isArray(files.ingredientImage)
      ? files.ingredientImage
      : []),
  ];

  uploadedFiles.forEach((file) => {
    try {
      if (file?.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    } catch (error) {
      console.error(
        "Uploaded File Cleanup Error:",
        error.message
      );
    }
  });
};

/*
  Convert Multer product image files
  into paths stored in MongoDB.
*/
const getUploadedProductImages = (files) => {
  if (!Array.isArray(files?.images)) {
    return [];
  }

  return files.images.map(
    (file) => `/uploads/products/${file.filename}`
  );
};

/*
  Get the separate ingredient label image
  uploaded by the frontend.
*/
const getUploadedIngredientImage = (files) => {
  const file = files?.ingredientImage?.[0];

  if (!file) {
    return "";
  }

  return `/uploads/products/${file.filename}`;
};

/*
  Safely parse the existingImages field
  sent by the admin frontend.
*/
const parseExistingImages = (value) => {
  if (value === undefined) {
    return null;
  }

  if (Array.isArray(value)) {
    return value.filter(
      (image) =>
        typeof image === "string" &&
        image.trim()
    );
  }

  if (typeof value !== "string") {
    return [];
  }

  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (image) =>
        typeof image === "string" &&
        image.trim()
    );
  } catch {
    return [];
  }
};

/*
  ========================================
  CREATE PRODUCT
  ========================================
*/
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      stock,
      sku,
      weight,
      description,
      isFeatured,
    } = req.body;

    /*
      Required product information.
    */
    if (
      !name?.trim() ||
      price === undefined ||
      price === "" ||
      stock === undefined ||
      stock === "" ||
      !sku?.trim() ||
      !weight?.trim() ||
      !description?.trim()
    ) {
      cleanupUploadedFiles(req.files);

      return res.status(400).json({
        success: false,
        message:
          "Name, price, stock, SKU, weight and description are required.",
      });
    }

    /*
      Validate price.
    */
    const priceValue = Number(price);

    if (
      !Number.isFinite(priceValue) ||
      priceValue < 0
    ) {
      cleanupUploadedFiles(req.files);

      return res.status(400).json({
        success: false,
        message: "Please enter a valid product price.",
      });
    }

    /*
      Validate stock.
    */
    const stockValue = Number(stock);

    if (
      !Number.isInteger(stockValue) ||
      stockValue < 0
    ) {
      cleanupUploadedFiles(req.files);

      return res.status(400).json({
        success: false,
        message:
          "Stock must be a non-negative whole number.",
      });
    }

    /*
      Normal product images.
    */
    const productImages =
      getUploadedProductImages(req.files);

    if (productImages.length === 0) {
      cleanupUploadedFiles(req.files);

      return res.status(400).json({
        success: false,
        message:
          "At least one product image is required.",
      });
    }

    if (productImages.length > 4) {
      cleanupUploadedFiles(req.files);

      return res.status(400).json({
        success: false,
        message:
          "You can upload a maximum of 4 product images.",
      });
    }

    /*
      Separate ingredient label image.

      This is optional. If uploaded, it is
      stored separately from normal product
      images and used by View Ingredients.
    */
    const ingredientImage =
      getUploadedIngredientImage(req.files);

    /*
      Product model automatically calculates
      inventory status during save.
    */
    const product = await Product.create({
      name: name.trim(),

      price: priceValue,

      stock: stockValue,

      sku: sku.trim(),

      weight: weight.trim(),

      description: description.trim(),

      images: productImages,

      ingredientImage,

      isFeatured:
        isFeatured === true ||
        isFeatured === "true",
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    console.error(
      "Create Product Error:",
      error
    );

    /*
      If database creation fails after
      Multer uploaded files, remove them.
    */
    cleanupUploadedFiles(req.files);

    /*
      Duplicate SKU.
    */
    if (
      error?.code === 11000 &&
      (error?.keyPattern?.sku ||
        error?.keyValue?.sku)
    ) {
      return res.status(409).json({
        success: false,
        message:
          "This SKU already exists. Please use a unique SKU.",
      });
    }

    /*
      Mongoose validation error.
    */
    if (error?.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message:
          Object.values(error.errors || {})[0]
            ?.message ||
          "Invalid product information.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to create product.",
    });
  }
};

/*
  ========================================
  GET ALL PRODUCTS
  ========================================
*/
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(
      "Get Products Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch products.",
    });
  }
};

/*
  ========================================
  GET FEATURED PRODUCTS
  ========================================
*/
export const getFeaturedProducts = async (
  req,
  res
) => {
  try {
    const products = await Product.find({
      isFeatured: true,

      status: {
        $ne: "Out of Stock",
      },
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(
      "Get Featured Products Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch featured products.",
    });
  }
};

/*
  ========================================
  GET SINGLE PRODUCT
  ========================================
*/
export const getProductById = async (
  req,
  res
) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(
      "Get Product By ID Error:",
      error
    );

    /*
      Invalid MongoDB ObjectId.
    */
    if (error?.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch product.",
    });
  }
};

/*
  ========================================
  UPDATE PRODUCT
  ========================================
*/
export const updateProduct = async (
  req,
  res
) => {
  /*
    Keep track of newly uploaded files.

    If database update fails, only the new
    uploads should be deleted. Existing
    product files must remain untouched.
  */
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      cleanupUploadedFiles(req.files);

      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    /*
      Store original paths so removed/replaced
      files can be deleted only after MongoDB
      saves successfully.
    */
    const oldImages = Array.isArray(
      product.images
    )
      ? [...product.images]
      : [];

    const oldIngredientImage =
      product.ingredientImage || "";

    const {
      name,
      price,
      stock,
      sku,
      weight,
      description,
      isFeatured,
      existingImages,
      existingIngredientImage,
    } = req.body;

    /*
      ======================================
      BASIC INFORMATION
      ======================================
    */

    if (name !== undefined) {
      const cleanName = name.trim();

      if (!cleanName) {
        cleanupUploadedFiles(req.files);

        return res.status(400).json({
          success: false,
          message: "Product name is required.",
        });
      }

      product.name = cleanName;
    }

    if (price !== undefined) {
      const priceValue = Number(price);

      if (
        !Number.isFinite(priceValue) ||
        priceValue < 0
      ) {
        cleanupUploadedFiles(req.files);

        return res.status(400).json({
          success: false,
          message:
            "Please enter a valid product price.",
        });
      }

      product.price = priceValue;
    }

    if (stock !== undefined) {
      const stockValue = Number(stock);

      if (
        !Number.isInteger(stockValue) ||
        stockValue < 0
      ) {
        cleanupUploadedFiles(req.files);

        return res.status(400).json({
          success: false,
          message:
            "Stock must be a non-negative whole number.",
        });
      }

      product.stock = stockValue;
    }

    if (sku !== undefined) {
      const cleanSku = sku.trim();

      if (!cleanSku) {
        cleanupUploadedFiles(req.files);

        return res.status(400).json({
          success: false,
          message: "SKU is required.",
        });
      }

      product.sku = cleanSku;
    }

    if (weight !== undefined) {
      const cleanWeight = weight.trim();

      if (!cleanWeight) {
        cleanupUploadedFiles(req.files);

        return res.status(400).json({
          success: false,
          message: "Product weight is required.",
        });
      }

      product.weight = cleanWeight;
    }

    if (description !== undefined) {
      const cleanDescription =
        description.trim();

      if (!cleanDescription) {
        cleanupUploadedFiles(req.files);

        return res.status(400).json({
          success: false,
          message:
            "Product description is required.",
        });
      }

      product.description =
        cleanDescription;
    }

    if (isFeatured !== undefined) {
      product.isFeatured =
        isFeatured === true ||
        isFeatured === "true";
    }

    /*
      ======================================
      PRODUCT IMAGES
      ======================================

      Frontend sends:
      existingImages = JSON array containing
      the old images that admin decided to
      keep.

      req.files.images contains newly
      uploaded images.
    */

    const parsedExistingImages =
      parseExistingImages(existingImages);

    const newProductImages =
      getUploadedProductImages(req.files);

    let finalImages;

    if (parsedExistingImages !== null) {
      finalImages = [
        ...parsedExistingImages,
        ...newProductImages,
      ];
    } else {
      /*
        If existingImages was not sent,
        retain all current product images
        and append new ones.
      */
      finalImages = [
        ...oldImages,
        ...newProductImages,
      ];
    }

    /*
      Remove accidental duplicates.
    */
    finalImages = [...new Set(finalImages)];

    if (finalImages.length === 0) {
      cleanupUploadedFiles(req.files);

      return res.status(400).json({
        success: false,
        message:
          "At least one product image is required.",
      });
    }

    if (finalImages.length > 4) {
      cleanupUploadedFiles(req.files);

      return res.status(400).json({
        success: false,
        message:
          "A product can have a maximum of 4 images.",
      });
    }

    product.images = finalImages;

    /*
      ======================================
      INGREDIENT LABEL IMAGE
      ======================================

      Frontend sends:
      - existingIngredientImage
      - ingredientImage (new file)

      If a new ingredient image is uploaded,
      it replaces the old one.

      If frontend sends an empty
      existingIngredientImage and no new
      image, the old image is removed.
    */

    const newIngredientImage =
      getUploadedIngredientImage(req.files);

    if (newIngredientImage) {
      product.ingredientImage =
        newIngredientImage;
    } else if (
      existingIngredientImage !== undefined
    ) {
      product.ingredientImage =
        typeof existingIngredientImage ===
        "string"
          ? existingIngredientImage.trim()
          : "";
    }

    /*
      Save product.

      Product model automatically recalculates
      Active / Low Stock / Out of Stock.
    */
    await product.save();

    /*
      ======================================
      DELETE REMOVED PRODUCT IMAGES
      ======================================

      Only delete files after database save
      has succeeded.
    */
    oldImages.forEach((oldImage) => {
      if (!product.images.includes(oldImage)) {
        deleteLocalFile(oldImage);
      }
    });

    /*
      Delete previous ingredient image only
      if it has actually been replaced or
      removed.
    */
    if (
      oldIngredientImage &&
      oldIngredientImage !==
        product.ingredientImage
    ) {
      deleteLocalFile(
        oldIngredientImage
      );
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product,
    });
  } catch (error) {
    console.error(
      "Update Product Error:",
      error
    );

    /*
      Database update failed, so remove
      newly uploaded files from disk.
    */
    cleanupUploadedFiles(req.files);

    /*
      Duplicate SKU.
    */
    if (
      error?.code === 11000 &&
      (error?.keyPattern?.sku ||
        error?.keyValue?.sku)
    ) {
      return res.status(409).json({
        success: false,
        message:
          "This SKU already exists. Please use a unique SKU.",
      });
    }

    /*
      Invalid MongoDB ObjectId.
    */
    if (error?.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID.",
      });
    }

    /*
      Mongoose validation.
    */
    if (error?.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message:
          Object.values(error.errors || {})[0]
            ?.message ||
          "Invalid product information.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to update product.",
    });
  }
};

/*
  ========================================
  DELETE PRODUCT
  ========================================
*/
export const deleteProduct = async (
  req,
  res
) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    /*
      Keep file paths before deleting
      the MongoDB product.
    */
    const productImages = Array.isArray(
      product.images
    )
      ? [...product.images]
      : [];

    const ingredientImage =
      product.ingredientImage || "";

    /*
      Delete database record first.

      This prevents losing files while the
      product still exists if MongoDB deletion
      unexpectedly fails.
    */
    await Product.findByIdAndDelete(
      req.params.id
    );

    /*
      Delete normal product images.
    */
    productImages.forEach((image) => {
      deleteLocalFile(image);
    });

    /*
      Delete separate ingredient label image.
    */
    if (ingredientImage) {
      deleteLocalFile(ingredientImage);
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
      product,
    });
  } catch (error) {
    console.error(
      "Delete Product Error:",
      error
    );

    if (error?.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to delete product.",
    });
  }
};