const mongoose = require('mongoose');
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
// const { roles } = require('../config/roles');

const partySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    imageName: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    local: {
      type: String,
      required: true,
      trim: true,
    },
    participants: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
    tickets: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Ticket' }],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
partySchema.plugin(toJSON);
partySchema.plugin(paginate);
/**
 * @typedef Party
 */
const Party = mongoose.model('Party', partySchema);

module.exports = Party;

// const ticketSchema = mongoose.Schema({
//   description: String,
//   price: Number,
//   displayablePrice: String,
// });

// const purchasedTicketSchema = mongoose.Schema({
//   ticket: ticketSchema,
//   event: partySchema,
// });

// const userSchema = mongoose.Schema({
//   name: String,
//   imageName: String,
//   userTickets: [purchasedTicketSchema],
// });
