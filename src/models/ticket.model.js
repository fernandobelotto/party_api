const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
  description: String,
  price: Number,
  displayablePrice: String,
});

/**
 * @typedef Ticket
 */
const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
