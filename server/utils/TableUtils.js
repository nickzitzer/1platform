const mysql = require('mysql');
const db = require('../config/dbconnection');

class TableUtils {
    constructor(userId) {
        this.userId = userId;

    }

    tableExists(tableName) {
        let query = "SELECT * FROM table_definition WHERE name = '" + tableName + "';";
        db.query(query, (err, result, next) => {
            if(err) {
                return false;
            } else {
                return result.length > 0;
            }
        });
    }

    fieldExists(tableName, field) {
        let query = "SELECT * FROM field_definition WHERE table = '" + this.getTableIdReference(tableName) + "' AND name = '" + field + "';";
        db.query(query, (err, result, next) => {
            if(err) {
                return false;
            } else {
                return result.length > 0;
            }
        });
    }

    createTable(tableName, tableLabel, fieldArray) {
        // Validate Table Doesn't Exist
        if(this.tableExists(tableName)) {
            throw new Error(tableLabel + ' (' + tableName + ') already exists.');
        } else if (this.validateTableName(tableName)) {
            throw new Error(tableLabel + ' (' + tableName + ') is an invalid table name.');
        } else {
            let fldArr = [];
            let query = "CREATE TABLE " + tableName + ' (';

            // Add global fields
            fldArr.push('id BINARY(16) PRIMARY KEY');
            fldArr.push('created_by BINARY(16) REFERENCES user(id)');
            fldArr.push('created_on DATETIME');
            fldArr.push('updated_by BINARY(16) REFERENCES user(id)');
            fldArr.push('updated_on DATETIME');

            // Add user specified fields
            for(let i = 0; i < fieldArray.length; i++) {
                if(!this.validateFieldName(fieldArray[i].fieldName)) {
                    throw new Error(fieldArray[i].fieldName + ' is an invalid field name.');
                } else if(!this.validateFieldType(fieldArray[i].fieldType)) {
                    throw new Error(fieldArray[i].fieldType + ' is an invalid field type.');
                } else {
                    fldArr.push(fieldArray[i].fieldName + ' ' + fieldArray[i].fieldType);
                }
            }

            query += fldArr.join(', ') + ');';

            db.query(query, (err, result) => {
                if(err) {
                    next(err);
                } else {
                    // If table creation successful, create record in table_definitions table
                    query = 'INSERT INTO table_definition (id, created_by, created_on, updated_by, updated_on, name, label)';
                    query += ' VALUES (UUID_TO_BIN(UUID()), ' + this.userId + ', NOW(), ' + this.userId + ', NOW(), ' + tableName + ', ' + tableLabel + ');';

                    db.query(query, (err, result) => {
                       if(err) {
                           next(err);
                       } else {
                           let tableDefId = result.insertId;
                           // If table definition successful, create field definitions
                           query = 'INSERT INTO field_definition (id, created_by, created_on, updated_by, updated_on, name, label, type, table) VALUES ';
                           query += ' (UUID_TO_BIN(UUID()), UUID_TO_BIN(' + this.userId + '), NOW(), UUID_TO_BIN(' + this.userId + '), NOW(), id, Id, ' + this.getFieldTypeReference('UUID') + ', ' + tableDefId + '),';
                           query += ' (UUID_TO_BIN(UUID()), UUID_TO_BIN(' + this.userId + '), NOW(), UUID_TO_BIN(' + this.userId + '), NOW(), created_by, Created By, ' + this.getFieldTypeReference('UUID') + ', ' + tableDefId + '),';
                           query += ' (UUID_TO_BIN(UUID()), UUID_TO_BIN(' + this.userId + '), NOW(), UUID_TO_BIN(' + this.userId + '), NOW(), created_on, Created On, ' + this.getFieldTypeReference('DATETIME') + ', ' + tableDefId + '),';
                           query += ' (UUID_TO_BIN(UUID()), UUID_TO_BIN(' + this.userId + '), NOW(), UUID_TO_BIN(' + this.userId + '), NOW(), updated_by, Updated By, ' + this.getFieldTypeReference('UUID') + ', ' + tableDefId + '),';
                           query += ' (UUID_TO_BIN(UUID()), UUID_TO_BIN(' + this.userId + '), NOW(), UUID_TO_BIN(' + this.userId + '), NOW(), updated_on, Updated On, ' + this.getFieldTypeReference('DATETIME') + ', ' + tableDefId + '),';

                           for(let j = 0; j < fieldArray.length; j++) {
                               query += ' (UUID_TO_BIN(UUID()), UUID_TO_BIN(' + this.userId + '), NOW(), UUID_TO_BIN(' + this.userId + '), NOW(), ' + fieldArray[j].fieldName + ', ' + fieldArray[j].fieldLabel + ', ' + this.getFieldTypeReference(fieldArray[j].fieldType) + ', ' + tableDefId + '),';
                           }

                           db.query(query, (err, result) => {
                               if(err) {
                                   next(err);
                               }
                           });
                       }
                    });
                }
            });
        }
    }

    dropTable(tableName) {
        if(this.tableExists(tableName)) {
            // Delete Table in Database
            db.query('DROP TABLE ' + tableName, (err, result) => {
                if(err) {
                    next(err);
                }
            });

            // Locate Definitions
            let tableId  = this.getTableIdReference(tableName);

            // Delete Field Definitions
            db.query('DELETE FROM field_definition WHERE table = ' + tableId, (err, result) => {
                if(err) {
                    next(err);
                }
            });

            // Delete Table Definition
            db.query('DELETE FROM table_definition WHERE id = ' + tableId, (err, result) => {
                if(err) {
                    next(err);
                }
            });
        }
    }

    truncateTable(tableName) {
        if(this.tableExists(tableName)) {
            db.query('TRUNCATE TABLE ' + tableName, (err, result) => {
                if(err) {
                    next(err);
                }
            });
        }
    }

    addFieldToTable(tableName, fieldLabel, fieldName, fieldType) {
        if(this.tableExists(tableName)) {
            throw new Error('Table does not exist');
        } else if(this.fieldExists(tableName, fieldName)) {
            throw new Error('Field already exists.');
        } else {
            db.query('ALTER TABLE ' + tableName + ' ADD COLUMN ' + fieldName + ' ' + fieldType + ';', (err, result) => {
                if(err) {
                    next(err)
                } else {
                    let query = 'INSERT INTO field_definition (id, created_by, created_on, updated_by, updated_on, name, label, type, table) VALUES ';
                    query += ' (UUID_TO_BIN(UUID()), UUID_TO_BIN(' + this.userId + '), NOW(), UUID_TO_BIN(' + this.userId + '), NOW(), ' + fieldName + ', ' + fieldLabel + ', ' + this.getFieldTypeReference(fieldType) + ', ' + this.getTableIdReference(tableName) + '),';

                    db.query(query, (err, result) => {
                        if(err) {
                            next(err);
                        }
                    });
                }
            });
        }
    }

    removeFieldFromTable(tableName, fieldName) {
        if(this.tableExists(tableName)) {
            throw new Error('Table does not exist');
        } else if(!this.fieldExists(tableName, fieldName)) {
            throw new Error('Field does not exist exists.');
        } else {
            db.query('ALTER TABLE ' + tableName + ' DROP COLUMN ' + fieldName + ';', (err, result) => {
                if (err) {
                    next(err)
                } else {
                    db.query('DELETE FROM field_definition WHERE name = ' + fieldName + ' AND table = ' + this.getTableIdReference(tableName) + ';', (err, result) => {
                        if(err) {
                            next(err);
                        }
                    });
                }
            });
        }
    }

    validateTableName(tableName) {
        return /^[0-9a-zA-Z_\$]+$/i.test(tableName);
    }

    validateFieldType(fieldType) {
        db.query('SELECT id FROM field_type_definition WHERE name = ' + fieldType, (err, result) => {
            if(err) {
                next(err);
            } else {
                return result.length > 0;
            }
        });
    }

    getFieldTypeReference(fieldType) {
        db.query('SELECT id FROM field_type_definition WHERE name = ' + fieldType, (err, result) => {
            if(err) {
                next(err);
            } else {
                return result[0].id + '';
            }
        });
    }

    validateFieldName(fieldName) {
        return /^[0-9a-zA-Z_\$]+$/i.test(fieldName);
    }

    getTableIdReference(tableName) {
        db.query('SELECT id FROM table_definition WHERE name = ' + tableName, (err, result) => {
           if(err) {
               next(err);
           } else {
               return result[0].id + '';
           }
        });
    }
}

module.exports = new TableUtils();
