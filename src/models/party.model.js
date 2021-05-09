const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const partySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: roles,
      default: 'party',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
partySchema.plugin(toJSON);
partySchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The party's email
 * @param {ObjectId} [excludePartyId] - The id of the party to be excluded
 * @returns {Promise<boolean>}
 */
partySchema.statics.isEmailTaken = async function (email, excludePartyId) {
  const party = await this.findOne({ email, _id: { $ne: excludePartyId } });
  return !!party;
};

/**
 * Check if password matches the party's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
partySchema.methods.isPasswordMatch = async function (password) {
  const party = this;
  return bcrypt.compare(password, party.password);
};

partySchema.pre('save', async function (next) {
  const party = this;
  if (party.isModified('password')) {
    party.password = await bcrypt.hash(party.password, 8);
  }
  next();
});

/**
 * @typedef Party
 */
const Party = mongoose.model('Party', partySchema);

module.exports = Party;