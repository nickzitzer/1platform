const express = require('express');
const restapi = express.Router();

const con = require('../config/dbconnection');
const TableUtils = require('../utils/TableUtils')

/* GET individual record from table */
restapi.get('/:table/:id', function(req, res, next) {
    let table = req.params.table;
    let id = req.params.id;

    // Validate Actual Table
    if(!TableUtils.tableExists(table)) {
        res.status(500).send({err: "Record not found. Invalid table name.", table: table});
    } else {
        con.query('SELECT * FROM ' + table + ' WHERE id=' + id, (err, result) => {
            if(err) {
                res.status(500).send(err);
            } else {
                res.send(result);
            }
        });
    }
});

/* GET list of records from table */
restapi.get('/:table', function(req, res, next) {
    let table = req.params.table;

    // Validate Actual Table
    if(!TableUtils.tableExists(table)) {
        res.status(500).send({err: "List not found. Invalid table name.", table: table});
    } else {
        con.query('SELECT * FROM ' + table, (err, result) => {
            if(err) {
                res.status(500).send(err);
            } else {
                res.send(result);
            }
        });
    }
});

/* INSERT record */
restapi.post('/:table', function(req, res, next) {
    let table = req.params.table;

    console.log('Post received for table ' + table);

    // Validate Actual Table
    if(!TableUtils.tableExists(table)) {
        res.status(500).send({err: "Record not inserted. Invalid table name.", table: table});
    } else {

    }
});

/* Replace record */
restapi.put('/:table/:id', function(req, res, next) {
    let table = req.params.table;
    let id = req.params.id;

    // Validate Actual Table
    if(!TableUtils.tableExists(table)) {
        res.status(500).send({err: "Record not inserted. Invalid table name.", table: table});
    } else {

    }
});

/* UPDATE record */
restapi.patch('/:table/:id', function(req, res, next) {
    let table = req.params.table;
    let id = req.params.id;

    // Validate Actual Table
    if(!TableUtils.tableExists(table)) {
        res.status(500).send({err: "Record not inserted. Invalid table name.", table: table});
    } else {

    }
});

/* DELETE RECORD */
restapi.delete('/:table/:id', function(req, res, next) {
    let table = req.params.table;
    let id = req.params.id;

    // Validate Actual Table
    if(!TableUtils.tableExists(table)) {
        res.status(500).send({err: "Record not inserted. Invalid table name.", table: table});
    } else {

    }
});

module.exports = restapi;
