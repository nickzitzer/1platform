const db = require('../config/sql.db.config');

class LogUtils {
    constructor(userId) {
        this.userId = userId;

        let _log = function(message, record = '', level) {
            var query = 'INSERT INTO system_log (id, created_by, created_on, updated_by, updated_on, message, recordId, recordTable, level) ';
            query += ' VALUES (UUID_TO_BIN(UUID()), UUID_TO_BIN(' + this.userId + '), NOW(), UUID_TO_BIN(' + this.userId + '), NOW(),';
            query += ' ' + message + ', ' + (record == '' ? 'NULL' : record.getID()) + ', ' + (record == '' ? 'NULL' : record.getTableName());
            query += ', ' + level;

            db.query(query, (err, result) => {
                if(err) {
                    next(err);
                }
            });
        };

        this.info = function(message, record = '') {
            _log(message, record, 'info');
        };

        this.warning = function(message, record = '') {
            _log(message, record, 'warning');
        }

        this.danger = function(message, record = '') {
            _log(message, record, 'danger');
        }

        this.success = function(message, record = '') {
            _log(message, record, 'success');
        }
    }
}
