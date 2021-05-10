const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const ticketSchema = mongoose.Schema({
  description: { type: String, required: true },
  partyId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Party',
    required: true,
  },
  price: { type: Number, required: true },
});

ticketSchema.plugin(toJSON);
ticketSchema.plugin(paginate);
/**
 * @typedef Ticket
 */
const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
