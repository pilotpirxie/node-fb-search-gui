const mongoose = require('mongoose');
const databaseConfig = require('../config/database.js');
mongoose.connect(databaseConfig.mongourl);
const Invoice = require('../models/invoices');

module.exports = {
    /**
     * Create new invoice
     * @param  {req.body} invoiceData Data from payment input
     * @param  {string} userID ID of user
     * @return {object} invoice Object of invoice inserted into db or error
     */
    add: function (invoiceData, userID) {
        return new Promise((resolve,reject) => {
            let newReportsObj = {
                createDate: (new Date()),
                userID: userID,
                downloadURL: '',
                amount: invoiceData.amount,
                paymentID: invoiceData.paymentID,
                paymentStatus: invoiceData.paymentStatus
            };
            Invoice.create(newReportsObj).then(invoice => {
                resolve(invoice);
            }).catch(err => {
                reject(err);
            });
        });
    },

    /**
     * Get all invoices for specific user
     * @param  {number} uID User ID
     * @return {array} Invoices
     */
    getAll: function (userID) {
        return new Promise((resolve, reject) => {
            Invoice.find({userID: userID}).then(invoices => {
                resolve(invoices);
            }).catch(err => {
                reject(err);
            });
        });
    }
};
