let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

let {reactComponent} = require('../config/mongo.db.config');

// CREATE
router.post('', (req, res, next) => {
    reactComponent.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

// READ
router.get('', (req, res) => {
    reactComponent.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get Single
router.get('/:id', (req, res) => {
    reactComponent.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update
router.put('/:id', (req, res, next) => {
    reactComponent.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Student updated successfully !')
        }
    })
})

// Delete
router.delete('/:id', (req, res, next) => {
    reactComponent.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = router;
