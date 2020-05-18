const mailTransport = require('../config/nodemailer');
const db = require('../config/dbconnection');
const LogUtils = require('LogUtils');

class EmailUtils {
    constructor(userId) {
        this.userId = userId;
    }

    sendEmail(emailTemplateId, record) {
        var lu = new LogUtils();

        db.query('SELECT * FROM email_template_definition WHERE id = ' + emailTemplateId, (err, result) => {
           if(err) {
               next(err);
           } else {
               var mailOptions = {}; // BUILD OPTIONS

               mailTransport.sendMail(mailOptions, function(err, info){
                   if (err) {
                       next(err);
                   } else {
                       lu.info(info.response, record);
                   }
               });
           }
        });
    }

    validateEmailAddress(mail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
    }
}
