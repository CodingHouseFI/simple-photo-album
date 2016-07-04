'use strict';

const express = require('express');
const Album = require('../models/album');

let router = express.Router();

router.route('/')
  .get((req, res) => {
    Album.find({}, (err, albums) => {
      res.status(err ? 400 : 200).send(err || albums);
    });
  })
  .post((req, res) => {
    Album.create(req.body, (err, album) => {
      res.status(err ? 400 : 200).send(err || album);
    })
  })

router.route('/:id')
  .get((req, res) => {
    Album.findById(req.params.id)
      .exec((err, album) => {
        if(err || !album) return res.status(400).send(err || {error: 'Album not found.'});
        res.send(album);
      });
  })
//   POST /api/albums/:albumId


  .post((req, res) => {
    Album.findById(req.params.id)
      .exec((err, album) => {
        if(err || !album) return res.status(400).send(err || {error: 'Album not found.'});

        let image = {
          url: req.body.url
        };

        album.images.push(image);

        album.save(err => {
          res.status(err ? 400 : 200).send(err);
        });
      });
  })
  .put((req, res) => {
    Album.findByIdAndUpdate(req.params.id, req.body, err => {
      res.status(err ? 400 : 200).send(err);
    });
  })
  .delete((req, res) => {
    Album.findByIdAndRemove(req.params.id, err => {
      res.status(err ? 400 : 200).send(err);
    });
  })

router.route('/:albumId/image/:imageId')
  .get((req, res) => {
    Album.findById(req.params.albumId, (err, album) => {
      if(err || !album) return res.status(400).send(err || {error: 'Album not found.'});

      let image = album.images.id(req.params.imageId);

      res.status(image ? 200 : 400).send(image || {error: 'Image not found'});
    });
  })
  .delete((req, res) => {
    Album.findById(req.params.albumId)
      .exec((err, album) => {
        if(err || !album) return res.status(400).send(err || {error: 'Album not found.'});

        album.images.id(req.params.imageId).remove();

        album.save(err => {
          res.status(err ? 400 : 200).send(err);
        });
      });
  })

module.exports = router;
