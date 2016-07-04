'use strict';

const mongoose = require('mongoose');

let imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

let albumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  images: [imageSchema]
});

let Album = mongoose.model('Album', albumSchema);

module.exports = Album;
