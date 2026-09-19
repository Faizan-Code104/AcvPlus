import React, { useEffect, useMemo, useState } from "react";
import { API_BASE_URL } from "../../config";

import {
  Search,
  Plus,
  MoreHorizontal,
  Edit3,
  Trash2,
  Eye,
  Package,
  ChevronDown,
  X,
  Upload,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Loader2,
  RefreshCw,
  Sparkles,
  Image as ImageIcon,
  Leaf,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";

const API_URL = `${API_BASE_URL}/api/products`;
const SERVER_URL = API_BASE_URL;

const MAX_PRODUCT_IMAGES = 4;

const EMPTY_FORM = {
  name: "",
  price: "",
  stock: "",
  sku: "",
  weight: "",
  description: "",
  servingSize: "",
  servingsPerContainer: "",
  ingredients: "",
  directions: "",
  warnings: "",
  supplementFacts: "",
  images: [],
  ingredientImage: null,
  isFeatured: false,
};

const Products = () => {
  const [products, setProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [featuredFilter, setFeaturedFilter] = useState("All");
  const [sortBy, setSortBy] = useState("latest");

  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const [formData, setFormData] = useState(EMPTY_FORM);

  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const [ingredientImagePreview, setIngredientImagePreview] = useState("");
  const [existingIngredientImage, setExistingIngredientImage] = useState("");

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const statuses = ["All", "Active", "Low Stock", "Out of Stock"];

  const featuredOptions = ["All", "Featured", "Not Featured"];

  /* =========================================================
     AUTH
  ========================================================= */

  const getToken = () => {
    return localStorage.getItem("acvplus-token");
  };

  const getHeaders = () => {
    const token = getToken();

    return {
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    };
  };

  /* =========================================================
     HELPERS
  ========================================================= */

  const getImageUrl = (image) => {
    if (!image || typeof image !== "string") {
      return "";
    }

    if (
      image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("blob:")
    ) {
      return image;
    }

    return `${SERVER_URL}${image}`;
  };

  const getProductId = (product) => product?._id || product?.id;

  const getStatusStyles = (status) => {
    if (status === "Active") {
      return "border border-emerald-100 bg-emerald-50 text-emerald-700";
    }

    if (status === "Low Stock") {
      return "border border-amber-100 bg-amber-50 text-amber-700";
    }

    return "border border-red-100 bg-red-50 text-red-600";
  };

  const getStatusIcon = (status) => {
    if (status === "Active") {
      return <CheckCircle2 size={12} />;
    }

    if (status === "Low Stock") {
      return <AlertCircle size={12} />;
    }

    return <XCircle size={12} />;
  };

  const formatPrice = (price) => {
    const number = Number(price);

    if (!Number.isFinite(number)) {
      return "0.00";
    }

    return number.toFixed(2);
  };

  const getCalculatedStatus = (stock) => {
    const value = Number(stock);

    if (value <= 0) {
      return "Out of Stock";
    }

    if (value <= 5) {
      return "Low Stock";
    }

    return "Active";
  };

  /* =========================================================
     FETCH
  ========================================================= */

  const fetchProducts = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setErrorMessage("");

      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to fetch products.");
      }

      setProducts(
        Array.isArray(data?.products)
          ? data.products
          : Array.isArray(data)
            ? data
            : [],
      );
    } catch (error) {
      console.error("Fetch Products Error:", error);

      setErrorMessage(error.message || "Unable to load products.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredProducts = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    let result = products.filter((product) => {
      const searchableText = [
        product?.name,
        product?.sku,
        product?.description,
        product?.ingredients,
        product?.servingSize,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = !search || searchableText.includes(search);

      const matchesStatus =
        statusFilter === "All" || product.status === statusFilter;

      const matchesFeatured =
        featuredFilter === "All" ||
        (featuredFilter === "Featured" && product.isFeatured === true) ||
        (featuredFilter === "Not Featured" && product.isFeatured !== true);

      return matchesSearch && matchesStatus && matchesFeatured;
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    if (sortBy === "stock-low") {
      result.sort((a, b) => Number(a.stock) - Number(b.stock));
    }

    if (sortBy === "stock-high") {
      result.sort((a, b) => Number(b.stock) - Number(a.stock));
    }

    if (sortBy === "featured") {
      result.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    }

    if (sortBy === "latest") {
      result.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
      );
    }

    return result;
  }, [products, searchTerm, statusFilter, featuredFilter, sortBy]);

  /* =========================================================
     STATS
  ========================================================= */

  const totalProducts = products.length;

  const activeProducts = products.filter(
    (product) => product.status === "Active",
  ).length;

  const lowStockProducts = products.filter(
    (product) => product.status === "Low Stock",
  ).length;

  const featuredProducts = products.filter(
    (product) => product.isFeatured === true,
  ).length;

  /* =========================================================
     FORM
  ========================================================= */

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setErrorMessage("");
  };

  /* =========================================================
     PRODUCT IMAGES
  ========================================================= */

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files || []);

    event.target.value = "";

    if (!files.length) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    const currentCount = existingImages.length + formData.images.length;

    const available = MAX_PRODUCT_IMAGES - currentCount;

    if (available <= 0) {
      setErrors((previous) => ({
        ...previous,
        images: `Maximum ${MAX_PRODUCT_IMAGES} product images are allowed.`,
      }));

      return;
    }

    const acceptedFiles = files.slice(0, available);

    for (const file of acceptedFiles) {
      if (!allowedTypes.includes(file.type)) {
        setErrors((previous) => ({
          ...previous,
          images: "Only JPG, JPEG, PNG and WEBP images are allowed.",
        }));

        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors((previous) => ({
          ...previous,
          images: "Each product image must be less than 5MB.",
        }));

        return;
      }
    }

    setFormData((previous) => ({
      ...previous,
      images: [...previous.images, ...acceptedFiles],
    }));

    setImagePreviews((previous) => [
      ...previous,
      ...acceptedFiles.map((file) => URL.createObjectURL(file)),
    ]);

    setErrors((previous) => ({
      ...previous,
      images:
        files.length > acceptedFiles.length
          ? `Maximum ${MAX_PRODUCT_IMAGES} product images are allowed.`
          : "",
    }));
  };

  const removeNewImage = (index) => {
    setFormData((previous) => ({
      ...previous,
      images: previous.images.filter((_, itemIndex) => itemIndex !== index),
    }));

    setImagePreviews((previous) => {
      const url = previous[index];

      if (url?.startsWith("blob:")) {
        URL.revokeObjectURL(url);
      }

      return previous.filter((_, itemIndex) => itemIndex !== index);
    });
  };

  const removeExistingImage = (index) => {
    setExistingImages((previous) =>
      previous.filter((_, itemIndex) => itemIndex !== index),
    );
  };

  /* =========================================================
     INGREDIENT LABEL IMAGE
  ========================================================= */

  const handleIngredientImageChange = (event) => {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setErrors((previous) => ({
        ...previous,
        ingredientImage: "Only JPG, JPEG, PNG and WEBP are allowed.",
      }));

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((previous) => ({
        ...previous,
        ingredientImage: "Ingredient image must be less than 5MB.",
      }));

      return;
    }

    if (ingredientImagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(ingredientImagePreview);
    }

    setFormData((previous) => ({
      ...previous,
      ingredientImage: file,
    }));

    setIngredientImagePreview(URL.createObjectURL(file));
    setExistingIngredientImage("");

    setErrors((previous) => ({
      ...previous,
      ingredientImage: "",
    }));
  };

  const removeIngredientImage = () => {
    if (ingredientImagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(ingredientImagePreview);
    }

    setIngredientImagePreview("");
    setExistingIngredientImage("");

    setFormData((previous) => ({
      ...previous,
      ingredientImage: null,
    }));
  };

  /* =========================================================
     VALIDATION
  ========================================================= */

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required.";
    }

    if (formData.price === "" || Number(formData.price) <= 0) {
      newErrors.price = "Enter a valid product price.";
    }

    if (formData.stock === "" || Number(formData.stock) < 0) {
      newErrors.stock = "Enter a valid stock quantity.";
    }

    if (!formData.sku.trim()) {
      newErrors.sku = "SKU is required.";
    }

    if (!formData.weight.trim()) {
      newErrors.weight = "Product weight is required.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (existingImages.length + formData.images.length === 0) {
      newErrors.images = "At least one product image is required.";
    }

    if (existingImages.length + formData.images.length > MAX_PRODUCT_IMAGES) {
      newErrors.images = `Maximum ${MAX_PRODUCT_IMAGES} product images are allowed.`;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =========================================================
     RESET / OPEN
  ========================================================= */

  const resetForm = () => {
    imagePreviews.forEach((url) => {
      if (url?.startsWith("blob:")) {
        URL.revokeObjectURL(url);
      }
    });

    if (ingredientImagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(ingredientImagePreview);
    }

    setFormData(EMPTY_FORM);
    setImagePreviews([]);
    setExistingImages([]);
    setIngredientImagePreview("");
    setExistingIngredientImage("");
    setErrors({});
    setEditingProduct(null);
  };

  const openAddModal = () => {
    resetForm();
    setErrorMessage("");
    setShowProductModal(true);
  };

  const openEditModal = (product) => {
    resetForm();

    setEditingProduct(product);

    setFormData({
      name: product?.name || "",
      price: product?.price ?? "",
      stock: product?.stock ?? "",
      sku: product?.sku || "",
      weight: product?.weight || "",
      description: product?.description || "",
      servingSize: product?.servingSize || "",
      servingsPerContainer: product?.servingsPerContainer || "",
      ingredients: product?.ingredients || "",
      directions: product?.directions || "",
      warnings: product?.warnings || "",
      supplementFacts: product?.supplementFacts || "",
      images: [],
      ingredientImage: null,
      isFeatured: product?.isFeatured === true,
    });

    setExistingImages(Array.isArray(product?.images) ? product.images : []);

    setExistingIngredientImage(
      product?.ingredientImage ||
        product?.ingredientsImage ||
        product?.supplementFactsImage ||
        "",
    );

    setOpenMenu(null);
    setShowProductModal(true);
  };

  const closeProductModal = () => {
    if (submitting) return;

    setShowProductModal(false);
    resetForm();
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const token = getToken();

    if (!token) {
      setErrorMessage("Authentication token not found. Please login again.");

      return;
    }

    try {
      setSubmitting(true);
      setErrorMessage("");
      setSuccessMessage("");

      const body = new FormData();

      body.append("name", formData.name.trim());
      body.append("price", Number(formData.price));
      body.append("stock", Number(formData.stock));
      body.append("sku", formData.sku.trim());
      body.append("weight", formData.weight.trim());
      body.append("description", formData.description.trim());

      body.append("servingSize", formData.servingSize.trim());
      body.append("servingsPerContainer", formData.servingsPerContainer.trim());
      body.append("ingredients", formData.ingredients.trim());
      body.append("directions", formData.directions.trim());
      body.append("warnings", formData.warnings.trim());
      body.append("supplementFacts", formData.supplementFacts.trim());

      body.append("isFeatured", String(formData.isFeatured));
      body.append("status", getCalculatedStatus(formData.stock));

      if (editingProduct) {
        body.append("existingImages", JSON.stringify(existingImages));

        body.append("existingIngredientImage", existingIngredientImage || "");
      }

      formData.images.forEach((file) => {
        body.append("images", file);
      });

      if (formData.ingredientImage) {
        body.append("ingredientImage", formData.ingredientImage);
      }

      const productId = getProductId(editingProduct);

      const url = editingProduct ? `${API_URL}/${productId}` : API_URL;

      const response = await fetch(url, {
        method: editingProduct ? "PUT" : "POST",
        headers: getHeaders(),
        body,
      });

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            `Failed to ${editingProduct ? "update" : "create"} product.`,
        );
      }

      const savedProduct = data?.product || data;

      if (editingProduct) {
        setProducts((previous) =>
          previous.map((product) =>
            getProductId(product) === productId ? savedProduct : product,
          ),
        );

        setSuccessMessage("Product updated successfully.");
      } else {
        setProducts((previous) => [savedProduct, ...previous]);

        setSuccessMessage("Product created successfully.");
      }

      closeProductModal();

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Save Product Error:", error);

      setErrorMessage(error.message || "Unable to save product.");
    } finally {
      setSubmitting(false);
    }
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDeleteProduct = async () => {
    if (!deleteProduct) return;

    const token = getToken();

    if (!token) {
      setErrorMessage("Authentication token not found. Please login again.");

      return;
    }

    const productId = getProductId(deleteProduct);

    try {
      setDeleting(true);
      setErrorMessage("");

      const response = await fetch(`${API_URL}/${productId}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(data?.message || "Failed to delete product.");
      }

      setProducts((previous) =>
        previous.filter((product) => getProductId(product) !== productId),
      );

      setDeleteProduct(null);

      setSuccessMessage("Product deleted successfully.");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Delete Product Error:", error);

      setErrorMessage(error.message || "Unable to delete product.");
    } finally {
      setDeleting(false);
    }
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="space-y-5">
      {/* HEADER */}

      <section className="relative overflow-hidden rounded-[24px] bg-[#172D57] px-5 py-6 text-white shadow-[0_15px_45px_rgba(16,40,93,0.10)] sm:px-7 sm:py-7">
        <div className="pointer-events-none absolute -right-16 -top-20 h-[230px] w-[230px] rounded-full bg-[#AFC8FF]/10" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5">
              <Leaf size={13} />

              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#C5D7FF]">
                ACV Plus Admin
              </span>
            </div>

            <h1 className="mt-4 text-[30px] font-bold tracking-[-0.035em] sm:text-[34px]">
              Products
            </h1>

            <p className="mt-2 max-w-[570px] text-[13px] leading-6 text-white/60">
              Manage ACV Plus products, inventory and product images.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => fetchProducts(true)}
              disabled={refreshing}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 text-[11px] font-bold transition hover:bg-white/10 disabled:opacity-50"
            >
              <RefreshCw
                size={15}
                className={refreshing ? "animate-spin" : ""}
              />
              Refresh
            </button>

            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#AFC8FF] px-5 text-[11px] font-bold text-[#172D57] transition hover:bg-white"
            >
              <Plus size={15} />
              Add Product
            </button>
          </div>
        </div>
      </section>

      {/* MESSAGES */}

      {successMessage && (
        <div className="rounded-[15px] border border-emerald-200 bg-emerald-50 px-5 py-4 text-[12px] font-semibold text-emerald-700">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center justify-between gap-3 rounded-[15px] border border-red-200 bg-red-50 px-5 py-4 text-[12px] font-semibold text-red-600">
          <span>{errorMessage}</span>

          <button type="button" onClick={() => setErrorMessage("")}>
            <X size={15} />
          </button>
        </div>
      )}

      {/* STATS */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Products" value={totalProducts} icon={Package} />

        <StatCard
          title="Active Products"
          value={activeProducts}
          icon={CheckCircle2}
          iconClass="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          title="Low Stock"
          value={lowStockProducts}
          icon={AlertCircle}
          iconClass="bg-amber-50 text-amber-600"
        />

        <StatCard
          title="Featured"
          value={featuredProducts}
          icon={Sparkles}
          iconClass="bg-violet-50 text-violet-600"
        />
      </div>

      {/* FILTERS */}

      <section className="rounded-[20px] border border-[#D6E2F7] bg-white p-4 shadow-[0_8px_28px_rgba(16,40,93,0.035)] sm:p-5">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full xl:max-w-[480px]">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3569C8]"
            />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search name, SKU or ingredients..."
              className="h-[44px] w-full rounded-full border border-[#D6E2F7] bg-[#F8FAFF] pl-11 pr-5 text-[12px] text-[#263B63] outline-none transition focus:border-[#AFC8FF] focus:bg-white"
            />
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            <FilterSelect
              value={statusFilter}
              onChange={setStatusFilter}
              options={statuses}
            />

            <FilterSelect
              value={featuredFilter}
              onChange={setFeaturedFilter}
              options={featuredOptions}
            />

            <FilterSelect
              value={sortBy}
              onChange={setSortBy}
              options={[
                {
                  value: "latest",
                  label: "Latest",
                },
                {
                  value: "featured",
                  label: "Featured First",
                },
                {
                  value: "price-low",
                  label: "Price: Low to High",
                },
                {
                  value: "price-high",
                  label: "Price: High to Low",
                },
                {
                  value: "stock-low",
                  label: "Stock: Low to High",
                },
                {
                  value: "stock-high",
                  label: "Stock: High to Low",
                },
              ]}
            />
          </div>
        </div>

        <p className="mt-4 text-[10px] font-semibold text-[#263B63]/45">
          Showing{" "}
          <span className="font-bold text-[#10285D]">
            {filteredProducts.length}
          </span>{" "}
          of {products.length} products
        </p>
      </section>

      {/* PRODUCT LIST */}

      <section className="overflow-hidden rounded-[22px] border border-[#D6E2F7] bg-white shadow-[0_8px_28px_rgba(16,40,93,0.035)]">
        <div className="flex items-center justify-between border-b border-[#D6E2F7] px-5 py-5 sm:px-6">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#3569C8]">
              Catalog
            </p>

            <h2 className="mt-1 text-[19px] font-bold text-[#10285D]">
              All Products
            </h2>
          </div>

          <Package size={20} className="text-[#3569C8]" />
        </div>

        {loading ? (
          <div className="flex min-h-[350px] flex-col items-center justify-center">
            <Loader2 size={28} className="animate-spin text-[#183A7A]" />

            <p className="mt-3 text-[12px] font-semibold text-[#263B63]/45">
              Loading products...
            </p>
          </div>
        ) : filteredProducts.length ? (
          <>
            {/* DESKTOP */}

            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[950px]">
                <thead>
                  <tr className="border-b border-[#D6E2F7] bg-[#F8FAFF]">
                    <TableHeading>Product</TableHeading>
                    <TableHeading>Featured</TableHeading>
                    <TableHeading>Price</TableHeading>
                    <TableHeading>Stock</TableHeading>
                    <TableHeading>Status</TableHeading>

                    <th className="px-6 py-4 text-right text-[9px] font-bold uppercase tracking-[0.12em] text-[#263B63]/40">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#D6E2F7]">
                  {filteredProducts.map((product) => {
                    const productId = getProductId(product);

                    return (
                      <tr
                        key={productId}
                        className="transition hover:bg-[#F8FAFF]"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <ProductImage
                              src={product?.images?.[0]}
                              alt={product.name}
                              getImageUrl={getImageUrl}
                            />

                            <div className="min-w-0">
                              <p className="max-w-[280px] truncate text-[12px] font-bold text-[#10285D]">
                                {product.name}
                              </p>

                              <p className="mt-1 text-[10px] text-[#263B63]/40">
                                SKU: {product.sku || "—"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          {product.isFeatured ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1.5 text-[10px] font-bold text-violet-600">
                              <Sparkles size={11} />
                              Featured
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold text-[#263B63]/35">
                              No
                            </span>
                          )}
                        </td>

                        <td className="px-6 py-4 text-[12px] font-bold text-[#10285D]">
                          ${formatPrice(product.price)}
                        </td>

                        <td className="px-6 py-4 text-[12px] font-bold text-[#263B63]/70">
                          {product.stock ?? 0}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold ${getStatusStyles(
                              product.status,
                            )}`}
                          >
                            {getStatusIcon(product.status)}
                            {product.status}
                          </span>
                        </td>

                        <td className="relative px-6 py-4 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenMenu(
                                openMenu === productId ? null : productId,
                              )
                            }
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F6FF] text-[#3569C8] transition hover:bg-[#183A7A] hover:text-white"
                          >
                            <MoreHorizontal size={17} />
                          </button>

                          {openMenu === productId && (
                            <ActionMenu
                              onView={() => {
                                setViewProduct(product);
                                setOpenMenu(null);
                              }}
                              onEdit={() => openEditModal(product)}
                              onDelete={() => {
                                setDeleteProduct(product);
                                setOpenMenu(null);
                              }}
                            />
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* MOBILE */}

            <div className="divide-y divide-[#D6E2F7] lg:hidden">
              {filteredProducts.map((product) => {
                const productId = getProductId(product);

                return (
                  <article key={productId} className="p-5">
                    <div className="flex gap-4">
                      <ProductImage
                        src={product?.images?.[0]}
                        alt={product.name}
                        getImageUrl={getImageUrl}
                        large
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate text-[13px] font-bold text-[#10285D]">
                              {product.name}
                            </p>

                            <p className="mt-1 text-[9px] text-[#263B63]/40">
                              SKU: {product.sku || "—"}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              setOpenMenu(
                                openMenu === productId ? null : productId,
                              )
                            }
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F1F6FF] text-[#3569C8]"
                          >
                            <MoreHorizontal size={16} />
                          </button>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <span className="text-[15px] font-bold text-[#10285D]">
                            ${formatPrice(product.price)}
                          </span>

                          {product.isFeatured && (
                            <span className="rounded-full bg-violet-50 px-2 py-1 text-[9px] font-bold text-violet-600">
                              Featured
                            </span>
                          )}
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-[10px] text-[#263B63]/50">
                            Stock:{" "}
                            <b className="text-[#10285D]">
                              {product.stock ?? 0}
                            </b>
                          </span>

                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-bold ${getStatusStyles(
                              product.status,
                            )}`}
                          >
                            {getStatusIcon(product.status)}
                            {product.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {openMenu === productId && (
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        <MobileAction
                          icon={Eye}
                          label="View"
                          onClick={() => {
                            setViewProduct(product);
                            setOpenMenu(null);
                          }}
                        />

                        <MobileAction
                          icon={Edit3}
                          label="Edit"
                          onClick={() => openEditModal(product)}
                        />

                        <MobileAction
                          icon={Trash2}
                          label="Delete"
                          danger
                          onClick={() => {
                            setDeleteProduct(product);
                            setOpenMenu(null);
                          }}
                        />
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </>
        ) : (
          <div className="px-6 py-20 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F1FF] text-[#3569C8]">
              <Search size={21} />
            </div>

            <h3 className="mt-4 text-[17px] font-bold text-[#10285D]">
              No products found
            </h3>

            <p className="mt-2 text-[11px] text-[#263B63]/50">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </section>

      {/* ADD / EDIT MODAL */}

      {showProductModal && (
        <div
          className="fixed inset-0 z-[100] overflow-y-auto bg-[#10285D]/65 px-4 py-6 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeProductModal();
            }
          }}
        >
          <div className="mx-auto w-full max-w-[900px] overflow-hidden rounded-[24px] border border-[#D6E2F7] bg-white shadow-[0_25px_80px_rgba(16,40,93,0.25)]">
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#D6E2F7] bg-white/95 px-5 py-5 backdrop-blur-xl sm:px-7">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#3569C8]">
                  ACV Plus Catalog
                </p>

                <h2 className="mt-1 text-[21px] font-bold text-[#10285D]">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeProductModal}
                disabled={submitting}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F1F6FF] text-[#263B63]/60 transition hover:bg-[#183A7A] hover:text-white"
              >
                <X size={17} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7 p-5 sm:p-7">
              {/* BASIC INFO */}

              <FormSection
                icon={Package}
                title="Product Information"
                description="Basic product and inventory details."
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Product Name" error={errors.name}>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="ACV Plus Wellness Capsules"
                      className={inputClass(errors.name)}
                    />
                  </Field>

                  <Field label="SKU" error={errors.sku}>
                    <input
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleInputChange}
                      placeholder="ACV-001"
                      className={inputClass(errors.sku)}
                    />
                  </Field>

                  <Field label="Price (USD)" error={errors.price}>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="29.99"
                      className={inputClass(errors.price)}
                    />
                  </Field>

                  <Field label="Stock Quantity" error={errors.stock}>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      placeholder="25"
                      className={inputClass(errors.stock)}
                    />
                  </Field>

                  <Field label="Weight" error={errors.weight}>
                    <input
                      type="text"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder="e.g. 90 g"
                      className={inputClass(errors.weight)}
                    />
                  </Field>

                  <div className="flex items-end">
                    <label
                      className={`flex min-h-[48px] w-full cursor-pointer items-center gap-3 rounded-[13px] border px-4 ${
                        formData.isFeatured
                          ? "border-[#AFC8FF] bg-[#E8F1FF]"
                          : "border-[#D6E2F7] bg-[#F8FAFF]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="isFeatured"
                        checked={formData.isFeatured}
                        onChange={handleInputChange}
                        className="h-4 w-4 accent-[#183A7A]"
                      />

                      <Sparkles size={16} className="text-[#3569C8]" />

                      <span className="text-[11px] font-bold text-[#10285D]">
                        Featured Product
                      </span>
                    </label>
                  </div>
                </div>

                <Field label="Description" error={errors.description}>
                  <textarea
                    rows="5"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Write the product description..."
                    className={textareaClass(errors.description)}
                  />
                </Field>
              </FormSection>

              {/* PRODUCT IMAGES */}

              <FormSection
                icon={ImageIcon}
                title="Product Images"
                description={`Upload up to ${MAX_PRODUCT_IMAGES} product images. The first image is the main product image.`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-semibold text-[#263B63]/45">
                    JPG, PNG or WEBP • Max 5MB each
                  </p>

                  <span className="rounded-full bg-[#E8F1FF] px-3 py-1 text-[10px] font-bold text-[#183A7A]">
                    {existingImages.length + imagePreviews.length}/
                    {MAX_PRODUCT_IMAGES}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {existingImages.map((image, index) => (
                    <ImagePreview
                      key={`existing-${image}-${index}`}
                      src={getImageUrl(image)}
                      main={index === 0}
                      onRemove={() => removeExistingImage(index)}
                    />
                  ))}

                  {imagePreviews.map((image, index) => (
                    <ImagePreview
                      key={`new-${image}`}
                      src={image}
                      main={existingImages.length === 0 && index === 0}
                      onRemove={() => removeNewImage(index)}
                    />
                  ))}

                  {existingImages.length + imagePreviews.length <
                    MAX_PRODUCT_IMAGES && (
                    <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-[16px] border-2 border-dashed border-[#C5D7FF] bg-[#F8FAFF] text-center transition hover:bg-[#F1F6FF]">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F1FF] text-[#3569C8]">
                        <Upload size={17} />
                      </div>

                      <span className="mt-2 text-[10px] font-bold text-[#183A7A]">
                        Add Image
                      </span>

                      <input
                        type="file"
                        multiple
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {errors.images && (
                  <p className="text-[10px] font-semibold text-red-500">
                    {errors.images}
                  </p>
                )}
              </FormSection>

              {/* INGREDIENT IMAGE */}

              <FormSection
                icon={ClipboardList}
                title="Ingredient Label Image"
                description="Upload one ingredient or Supplement Facts label image for the product's View Ingredients page."
              >
                <div className="max-w-[420px]">
                  {ingredientImagePreview || existingIngredientImage ? (
                    <div className="relative overflow-hidden rounded-[18px] border border-[#D6E2F7] bg-[#F8FAFF] p-3">
                      <img
                        src={
                          ingredientImagePreview ||
                          getImageUrl(existingIngredientImage)
                        }
                        alt="Ingredient label preview"
                        className="mx-auto max-h-[430px] w-full object-contain"
                      />

                      <button
                        type="button"
                        onClick={removeIngredientImage}
                        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-red-500 shadow-lg transition hover:bg-red-500 hover:text-white"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex min-h-[210px] cursor-pointer flex-col items-center justify-center rounded-[18px] border-2 border-dashed border-[#C5D7FF] bg-[#F8FAFF] px-5 text-center transition hover:bg-[#F1F6FF]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F1FF] text-[#3569C8]">
                        <Upload size={20} />
                      </div>

                      <p className="mt-3 text-[12px] font-bold text-[#10285D]">
                        Upload Ingredient Label
                      </p>

                      <p className="mt-1 text-[10px] text-[#263B63]/45">
                        One JPG, PNG or WEBP image • Max 5MB
                      </p>

                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleIngredientImageChange}
                        className="hidden"
                      />
                    </label>
                  )}

                  {errors.ingredientImage && (
                    <p className="mt-2 text-[10px] font-semibold text-red-500">
                      {errors.ingredientImage}
                    </p>
                  )}
                </div>
              </FormSection>

              {/* BUTTONS */}

              <div className="flex flex-col-reverse gap-3 border-t border-[#D6E2F7] pt-6 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeProductModal}
                  disabled={submitting}
                  className="min-h-[44px] rounded-full border border-[#D6E2F7] bg-white px-6 text-[11px] font-bold text-[#263B63] transition hover:bg-[#F1F6FF] disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#183A7A] px-7 text-[11px] font-bold text-white transition hover:bg-[#315FBA] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      {editingProduct ? (
                        <Edit3 size={15} />
                      ) : (
                        <Plus size={15} />
                      )}

                      {editingProduct ? "Update Product" : "Create Product"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}

      {viewProduct && (
        <div
          className="fixed inset-0 z-[105] flex items-center justify-center overflow-y-auto bg-[#10285D]/65 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setViewProduct(null);
            }
          }}
        >
          <div className="max-h-[92vh] w-full max-w-[780px] overflow-y-auto rounded-[24px] bg-white shadow-[0_25px_80px_rgba(16,40,93,0.28)]">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#D6E2F7] bg-white/95 px-6 py-5 backdrop-blur-xl">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#3569C8]">
                  Product Details
                </p>

                <h2 className="mt-1 text-[20px] font-bold text-[#10285D]">
                  {viewProduct.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setViewProduct(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F6FF] text-[#263B63]/60"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-6 p-6">
              <div className="grid gap-5 sm:grid-cols-[220px_1fr]">
                <div className="overflow-hidden rounded-[18px] border border-[#D6E2F7] bg-[#F8FAFF]">
                  {viewProduct.images?.[0] ? (
                    <img
                      src={getImageUrl(viewProduct.images[0])}
                      alt={viewProduct.name}
                      className="aspect-square h-full w-full object-contain p-3"
                    />
                  ) : (
                    <div className="flex aspect-square items-center justify-center text-[#263B63]/30">
                      <ImageIcon size={30} />
                    </div>
                  )}
                </div>

                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold ${getStatusStyles(
                      viewProduct.status,
                    )}`}
                  >
                    {getStatusIcon(viewProduct.status)}
                    {viewProduct.status}
                  </span>

                  <p className="mt-4 text-[26px] font-bold text-[#10285D]">
                    ${formatPrice(viewProduct.price)}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <DetailBox label="SKU" value={viewProduct.sku || "—"} />

                    <DetailBox label="Stock" value={viewProduct.stock ?? 0} />

                    <DetailBox
                      label="Weight"
                      value={viewProduct.weight || "—"}
                    />

                    <DetailBox
                      label="Featured"
                      value={viewProduct.isFeatured ? "Yes" : "No"}
                    />
                  </div>
                </div>
              </div>

              <ViewSection
                title="Description"
                value={viewProduct.description}
              />

              {(viewProduct.ingredientImage ||
                viewProduct.ingredientsImage ||
                viewProduct.supplementFactsImage) && (
                <div>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#3569C8]">
                    Ingredient Label
                  </p>

                  <div className="overflow-hidden rounded-[18px] border border-[#D6E2F7] bg-[#F8FAFF] p-4">
                    <img
                      src={getImageUrl(
                        viewProduct.ingredientImage ||
                          viewProduct.ingredientsImage ||
                          viewProduct.supplementFactsImage,
                      )}
                      alt="Ingredient label"
                      className="mx-auto max-h-[500px] object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}

      {deleteProduct && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#10285D]/65 p-4 backdrop-blur-sm">
          <div className="w-full max-w-[440px] rounded-[22px] bg-white p-6 shadow-[0_25px_80px_rgba(16,40,93,0.25)] sm:p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
              <Trash2 size={20} />
            </div>

            <h2 className="mt-5 text-[20px] font-bold text-[#10285D]">
              Delete Product?
            </h2>

            <p className="mt-2 text-[12px] leading-6 text-[#263B63]/55">
              Are you sure you want to delete{" "}
              <span className="font-bold text-[#10285D]">
                {deleteProduct.name}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setDeleteProduct(null)}
                disabled={deleting}
                className="min-h-[42px] rounded-full border border-[#D6E2F7] px-5 text-[11px] font-bold text-[#263B63] transition hover:bg-[#F1F6FF]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteProduct}
                disabled={deleting}
                className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full bg-red-500 px-5 text-[11px] font-bold text-white transition hover:bg-red-600 disabled:opacity-60"
              >
                {deleting && <Loader2 size={14} className="animate-spin" />}
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================
   SMALL COMPONENTS
========================================================= */

const StatCard = ({
  title,
  value,
  icon: Icon,
  iconClass = "bg-[#E8F1FF] text-[#183A7A]",
}) => (
  <article className="rounded-[20px] border border-[#D6E2F7] bg-white p-5 shadow-[0_8px_28px_rgba(16,40,93,0.035)]">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[11px] font-semibold text-[#263B63]/50">{title}</p>

        <p className="mt-2 text-[25px] font-bold text-[#10285D]">{value}</p>
      </div>

      <div
        className={`flex h-11 w-11 items-center justify-center rounded-[13px] ${iconClass}`}
      >
        <Icon size={19} />
      </div>
    </div>
  </article>
);

const FilterSelect = ({ value, onChange, options }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-[44px] min-w-[155px] appearance-none rounded-full border border-[#D6E2F7] bg-white pl-4 pr-10 text-[10px] font-bold text-[#263B63] outline-none transition hover:border-[#AFC8FF]"
    >
      {options.map((option) => {
        const isObject = typeof option === "object";

        const optionValue = isObject ? option.value : option;

        const label = isObject ? option.label : option;

        return (
          <option key={optionValue} value={optionValue}>
            {label}
          </option>
        );
      })}
    </select>

    <ChevronDown
      size={13}
      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#263B63]/40"
    />
  </div>
);

const TableHeading = ({ children }) => (
  <th className="px-6 py-4 text-left text-[9px] font-bold uppercase tracking-[0.12em] text-[#263B63]/40">
    {children}
  </th>
);

const ProductImage = ({ src, alt, getImageUrl, large = false }) => (
  <div
    className={`shrink-0 overflow-hidden rounded-[13px] border border-[#D6E2F7] bg-[#F1F6FF] ${
      large ? "h-[74px] w-[74px]" : "h-[58px] w-[58px]"
    }`}
  >
    {src ? (
      <img
        src={getImageUrl(src)}
        alt={alt || "Product"}
        className="h-full w-full object-contain p-1.5"
      />
    ) : (
      <div className="flex h-full w-full items-center justify-center text-[#263B63]/25">
        <ImageIcon size={19} />
      </div>
    )}
  </div>
);

const ActionMenu = ({ onView, onEdit, onDelete }) => (
  <div className="absolute right-6 top-14 z-30 w-[170px] overflow-hidden rounded-[14px] border border-[#D6E2F7] bg-white p-1.5 text-left shadow-[0_15px_40px_rgba(16,40,93,0.14)]">
    <MenuButton icon={Eye} label="View Product" onClick={onView} />

    <MenuButton icon={Edit3} label="Edit Product" onClick={onEdit} />

    <MenuButton
      icon={Trash2}
      label="Delete Product"
      onClick={onDelete}
      danger
    />
  </div>
);

const MenuButton = ({ icon: Icon, label, onClick, danger }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex w-full items-center gap-2.5 rounded-[9px] px-3 py-2.5 text-[10px] font-bold transition ${
      danger
        ? "text-red-500 hover:bg-red-50"
        : "text-[#263B63]/65 hover:bg-[#F1F6FF] hover:text-[#183A7A]"
    }`}
  >
    <Icon size={14} />
    {label}
  </button>
);

const MobileAction = ({ icon: Icon, label, onClick, danger }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex min-h-[38px] items-center justify-center gap-1.5 rounded-[10px] text-[9px] font-bold ${
      danger ? "bg-red-50 text-red-500" : "bg-[#F1F6FF] text-[#183A7A]"
    }`}
  >
    <Icon size={13} />
    {label}
  </button>
);

const FormSection = ({ icon: Icon, title, description, children }) => (
  <section className="rounded-[20px] border border-[#D6E2F7] bg-white p-5 sm:p-6">
    <div className="mb-5 flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#E8F1FF] text-[#3569C8]">
        <Icon size={17} />
      </div>

      <div>
        <h3 className="text-[14px] font-bold text-[#10285D]">{title}</h3>

        <p className="mt-1 text-[10px] leading-5 text-[#263B63]/45">
          {description}
        </p>
      </div>
    </div>

    <div className="space-y-5">{children}</div>
  </section>
);

const Field = ({ label, error, children }) => (
  <div>
    <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.12em] text-[#263B63]/50">
      {label}
    </label>

    {children}

    {error && (
      <p className="mt-1.5 text-[10px] font-semibold text-red-500">{error}</p>
    )}
  </div>
);

const inputClass = (error) =>
  `h-[48px] w-full rounded-[12px] border ${
    error ? "border-red-300" : "border-[#D6E2F7]"
  } bg-[#F8FAFF] px-4 text-[12px] font-medium text-[#263B63] outline-none transition placeholder:text-[#263B63]/30 focus:border-[#AFC8FF] focus:bg-white focus:ring-4 focus:ring-[#AFC8FF]/10`;

const textareaClass = (error) =>
  `w-full resize-y rounded-[12px] border ${
    error ? "border-red-300" : "border-[#D6E2F7]"
  } bg-[#F8FAFF] px-4 py-3 text-[12px] font-medium leading-6 text-[#263B63] outline-none transition placeholder:text-[#263B63]/30 focus:border-[#AFC8FF] focus:bg-white focus:ring-4 focus:ring-[#AFC8FF]/10`;

const ImagePreview = ({ src, main, onRemove }) => (
  <div className="relative aspect-square overflow-hidden rounded-[16px] border border-[#D6E2F7] bg-[#F8FAFF]">
    <img
      src={src}
      alt="Product preview"
      className="h-full w-full object-contain p-2"
    />

    {main && (
      <span className="absolute left-2 top-2 rounded-full bg-[#172D57] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.08em] text-white">
        Main
      </span>
    )}

    <button
      type="button"
      onClick={onRemove}
      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-red-500 shadow-md transition hover:bg-red-500 hover:text-white"
    >
      <X size={12} />
    </button>
  </div>
);

const DetailBox = ({ label, value }) => (
  <div className="rounded-[13px] bg-[#F1F6FF] p-3.5">
    <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-[#263B63]/40">
      {label}
    </p>

    <p className="mt-1.5 break-words text-[11px] font-bold text-[#10285D]">
      {value}
    </p>
  </div>
);

const ViewSection = ({ title, value }) => {
  if (!value) return null;

  return (
    <section className="rounded-[16px] border border-[#D6E2F7] bg-[#F8FAFF] p-4">
      <div className="flex items-center gap-2">
        <ShieldCheck size={14} className="text-[#3569C8]" />

        <h3 className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#10285D]">
          {title}
        </h3>
      </div>

      <p className="mt-3 whitespace-pre-line text-[11px] leading-6 text-[#263B63]/65">
        {value}
      </p>
    </section>
  );
};

export default Products;
