const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { partyService } = require('../services');

const createParty = catchAsync(async (req, res) => {
  const party = await partyService.createParty(req.body);
  res.status(httpStatus.CREATED).send(party);
});

const getPartys = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await partyService.queryPartys(filter, options);
  res.send(result);
});

const getParty = catchAsync(async (req, res) => {
  const party = await partyService.getPartyById(req.params.partyId);
  if (!party) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Party not found');
  }
  res.send(party);
});

const updateParty = catchAsync(async (req, res) => {
  const party = await partyService.updatePartyById(req.params.partyId, req.body);
  res.send(party);
});

const deleteParty = catchAsync(async (req, res) => {
  await partyService.deletePartyById(req.params.partyId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createParty,
  getPartys,
  getParty,
  updateParty,
  deleteParty,
};
