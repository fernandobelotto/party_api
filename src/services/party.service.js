const httpStatus = require('http-status');
const { Party } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a party
 * @param {Object} partyBody
 * @returns {Promise<Party>}
 */
const createParty = async (partyBody) => {
  // if (await Party.isEmailTaken(partyBody.email)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  const party = await Party.create(partyBody);
  return party;
};

/**
 * Query for partys
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPartys = async (filter, options) => {
  const partys = await Party.paginate(filter, options);
  return partys;
};

/**
 * Get party by id
 * @param {ObjectId} id
 * @returns {Promise<Party>}
 */
const getPartyById = async (id) => {
  return Party.findById(id);
};

/**
 * Get party by email
 * @param {string} email
 * @returns {Promise<Party>}
 */
const getPartyByEmail = async (email) => {
  return Party.findOne({ email });
};

/**
 * Update party by id
 * @param {ObjectId} partyId
 * @param {Object} updateBody
 * @returns {Promise<Party>}
 */
const updatePartyById = async (partyId, updateBody) => {
  const party = await getPartyById(partyId);
  if (!party) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Party not found');
  }
  if (updateBody.email && (await Party.isEmailTaken(updateBody.email, partyId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(party, updateBody);
  await party.save();
  return party;
};

/**
 * Delete party by id
 * @param {ObjectId} partyId
 * @returns {Promise<Party>}
 */
const deletePartyById = async (partyId) => {
  const party = await getPartyById(partyId);
  if (!party) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Party not found');
  }
  await party.remove();
  return party;
};

module.exports = {
  createParty,
  queryPartys,
  getPartyById,
  getPartyByEmail,
  updatePartyById,
  deletePartyById,
};
