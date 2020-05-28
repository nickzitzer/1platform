const express = require('express');
const restAPI = express.Router();

const { v4: uuidv4 } = require('uuid');

const db = require('../config/sql.db.config');
const TableUtils = require('../utils/TableUtils');

/* GET individual record from table */
restAPI.get('/:table/:id', function(req, res) {
    let table = req.params.table;
    let id = req.params.id;

    // Validate Actual Table
    if(!TableUtils.tableExists(table)) {
        res.status(500).send({err: "Record not found. Invalid table name.", table: table});
    } else {
        db.query('SELECT * FROM ' + table + ' WHERE id=' + id, (err, result) => {
            if(err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        });
    }
});

/* GET list of records from table */
restAPI.get('/:table', function(req, res) {
    let table = req.params.table;
    console.log('Table: ' + table);
    // Validate Actual Table
    if(!TableUtils.tableExists(table)) {
        console.log('Table doesnt exist');
        res.status(500).send({err: "List not found. Invalid table name.", table: table});
    } else {
        console.log('Table exists');

        db.query('SELECT * FROM ' + table, (err, result) => {
            if(err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(result);
            }
        });
    }
});

/* INSERT record */
restAPI.post('/:table', function(req, res) {
    let table = req.params.table;

    console.log('Post received for table ' + table);

    // Validate Actual Table
    if(!TableUtils.tableExists(table)) {
        res.status(500).send({err: "Record not inserted. Invalid table name.", table: table});
    } else {
        /* TODO: Generate Insert SQL Statement*/
    }
});

/* REPLACE record */
restAPI.put('/:table/:id', function(req, res) {
    let table = req.params.table;
    let id = req.params.id;

    // Validate Actual Table
    if(!TableUtils.tableExists(table)) {
        res.status(500).send({err: "Record not inserted. Invalid table name.", table: table});
    } else {
        /* TODO: Generate Update SQL Statement*/
    }
});

/* UPDATE record */
restAPI.patch('/:table/:id', function(req, res) {
    let table = req.params.table;
    let id = req.params.id;

    // Validate Actual Table
    if(!TableUtils.tableExists(table)) {
        res.status(500).send({err: "Record not inserted. Invalid table name.", table: table});
    } else {
        /* TODO: Generate Update SQL Statement*/
    }
});

/* DELETE RECORD */
restAPI.delete('/:table/:id', function(req, res) {
    let table = req.params.table;
    let id = req.params.id;

    // Validate Actual Table
    if(!TableUtils.tableExists(table)) {
        res.status(500).send({err: "Record not inserted. Invalid table name.", table: table});
    } else {
        db.query('DELETE FROM ' + table + ' WHERE id=' + id, (err, result) => {
            if(err) {
                res.status(500).json({err});
            } else {
                res.json({result});
            }
        });
    }
});

module.exports = restAPI;
