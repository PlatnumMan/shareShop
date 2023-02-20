const Product = require('../models/productModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const validateMongodbId = require('../utils/validateMongodbId');
const cloudinaryUploadImg = require('../utils/cloudinary');
const fs = require('fs');

const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// Update a product
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updatedProduct = await Product.findOneAndUpdate({ id }, req.body, {
      new: true,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// Update a product
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.status(200).json(deleteProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single product
const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const findProduct = await Product.findById(id);
    if (!findProduct) {
      res.status(404);
      throw new Error('Product not found');
    }
    res.status(200).json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// Get all products
const getProducts = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Limiting fields
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const numProducts = await Product.countDocuments();
      if (skip >= numProducts) throw new Error('This page does not exist');
    }

    const products = await query;
    res.status(200).json(products);
  } catch (error) {
    throw new Error(error);
  }
});

// Wishlist
const addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.body;
  try {
    const user = await User.findById(_id);
    const alreadyInWishlist = user.wishlist.find(
      (item) => item.toString() === productId
    );
    if (alreadyInWishlist) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: productId },
        },
        { new: true }
      );
      res.status(200).json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: productId },
        },
        { new: true }
      );
      res.status(200).json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, productId, comment } = req.body;
  try {
    const product = await Product.findById(productId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedBy.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        { $set: { 'ratings.$.star': star, 'ratings.$.comment': comment } },
        { new: true }
      );
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        productId,
        {
          $push: { ratings: { star, comment, postedBy: _id } },
        },
        { new: true }
      );
    }
    const getAllratings = await Product.findById(productId);
    let totalRating = getAllratings.ratings.length;
    let ratingSum = getAllratings.ratings
      .map((item) => item.star)
      .reduce((a, b) => a + b, 0);

    let actualRating = Math.round(ratingSum / totalRating);
    const finalProduct = await Product.findByIdAndUpdate(
      productId,
      {
        totalrating: actualRating,
      },
      { new: true }
    );
    res.json(finalProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const uploader = (path) => cloudinaryUploadImg(path, 'images');
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    const findProduct = await Product.findByIdAndUpdate(id, {
      images: urls.map(
        (file) => {
          return file;
        },
        { new: true }
      ),
    });
    res.status(200).json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  uploadImages,
};
