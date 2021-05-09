const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
// const { roles } = require('../config/roles');

const userSchema = mongoose.Schema(
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
    userTickets: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'PurchasedTicket' }],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

const User = mongoose.model('User', userSchema);

module.exports = User;
