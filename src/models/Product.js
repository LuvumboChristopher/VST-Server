const mongoose = require('mongoose')


const productsShema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'must provide a title'],
      unique: true,
    },
    author: {
      type: String,
      required: [true, 'must provide an author'],
    },
    year: {
      type: Number,
      required: [true, 'must provide a year'],
    },
    genre: [
      {
        genreName: {
          type: String,
          require: [true, 'must provide a genre'],
        },
      },
    ],
    price: {
      type: Number,
      required: [true, 'must provide a price'],
    },
    img: {
      type: String,
      required: [true, 'must provide an image'],
    },
    description: {
      type: String,
      required: [true, 'must provide a description'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', productsShema)
