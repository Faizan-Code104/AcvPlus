import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // ==============================
    // Basic Product Information
    // ==============================
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 150,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
      validate: {
        validator: Number.isInteger,
        message: "Stock must be a whole number.",
      },
    },

    sku: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      uppercase: true,
      maxlength: 100,
    },

    /*
      Examples:
      60 Gummies
      90 Capsules
      120 Tablets
      8 oz
      30 Servings
    */
    weight: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // ==============================
    // Product Images
    // ==============================
    images: {
      type: [String],
      required: true,

      validate: {
        validator: function (value) {
          return (
            Array.isArray(value) &&
            value.length >= 1 &&
            value.length <= 4
          );
        },

        message:
          "A product must have between 1 and 4 images.",
      },
    },

    // ==============================
    // Ingredient Label Image
    // ==============================
    /*
      Stores one separate ingredient /
      Supplement Facts label image.

      This image is used on the
      View Ingredients page and is
      separate from normal product images.
    */
    ingredientImage: {
      type: String,
      trim: true,
      default: "",
    },

    // ==============================
    // Homepage Featured Product
    // ==============================
    isFeatured: {
      type: Boolean,
      default: false,
    },

    // ==============================
    // Inventory Status
    // ==============================
    status: {
      type: String,

      enum: [
        "Active",
        "Low Stock",
        "Out of Stock",
      ],

      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

/*
  Automatically calculate inventory
  status whenever a product is saved.
*/
productSchema.pre("save", function () {
  if (this.stock === 0) {
    this.status = "Out of Stock";
  } else if (this.stock <= 5) {
    this.status = "Low Stock";
  } else {
    this.status = "Active";
  }
});

/*
  Automatically calculate inventory
  status when stock is updated using
  findOneAndUpdate().
*/
productSchema.pre(
  "findOneAndUpdate",
  function () {
    const update = this.getUpdate();

    if (!update) {
      return;
    }

    /*
      Support both:

      { stock: 10 }

      and

      { $set: { stock: 10 } }
    */
    const stockValue =
      update.stock !== undefined
        ? update.stock
        : update.$set?.stock;

    if (stockValue === undefined) {
      return;
    }

    const stock = Number(stockValue);

    let status = "Active";

    if (stock === 0) {
      status = "Out of Stock";
    } else if (stock <= 5) {
      status = "Low Stock";
    }

    if (update.$set) {
      update.$set.status = status;
    } else {
      update.status = status;
    }

    this.setUpdate(update);
  }
);

const Product = mongoose.model(
  "Product",
  productSchema
);

export default Product;