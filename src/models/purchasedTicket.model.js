const mongoose = require('mongoose');

const purchasedTicketSchema = mongoose.Schema({
  description: String,
  price: Number,
  displayablePrice: String,
});

/**
 * @typedef Ticket
 */
const PurchasedTicket = mongoose.model('PurchasedTicket', purchasedTicketSchema);

module.exports = PurchasedTicket;
