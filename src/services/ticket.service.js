const httpStatus = require('http-status');
const { partyService } = require('.');
const { Ticket } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a ticket
 * @param {Object} ticketBody
 * @returns {Promise<Ticket>}
 */
const createTicket = async (ticketBody) => {
  const ticket = await Ticket.create(ticketBody);
  const { partyId } = ticketBody;
  const { tickets } = await partyService.getPartyById(partyId);
  await partyService.updatePartyById(partyId, { tickets: [...tickets, ticket.id] });
  return ticket;
};

/**
 * Query for tickets
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTickets = async (filter, options) => {
  const tickets = await Ticket.paginate(filter, options);
  return tickets;
};

/**
 * Get ticket by id
 * @param {ObjectId} id
 * @returns {Promise<Ticket>}
 */
const getTicketById = async (id) => {
  return Ticket.findById(id);
};

const buyTicket = async (userId, ticketId) => {
  const { partyId } = await getTicketById(ticketId);
  const { participants } = await partyService.getPartyById(partyId);
  await partyService.updatePartyById(partyId, { participants: [...participants, userId] });
};

/**
 * Get ticket by email
 * @param {string} email
 * @returns {Promise<Ticket>}
 */
const getTicketByEmail = async (email) => {
  return Ticket.findOne({ email });
};

/**
 * Update ticket by id
 * @param {ObjectId} ticketId
 * @param {Object} updateBody
 * @returns {Promise<Ticket>}
 */
const updateTicketById = async (ticketId, updateBody) => {
  const ticket = await getTicketById(ticketId);
  if (!ticket) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ticket not found');
  }
  if (updateBody.email && (await Ticket.isEmailTaken(updateBody.email, ticketId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(ticket, updateBody);
  await ticket.save();
  return ticket;
};

/**
 * Delete ticket by id
 * @param {ObjectId} ticketId
 * @returns {Promise<Ticket>}
 */
const deleteTicketById = async (ticketId) => {
  const ticket = await getTicketById(ticketId);
  if (!ticket) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ticket not found');
  }
  await ticket.remove();
  return ticket;
};

module.exports = {
  createTicket,
  buyTicket,
  queryTickets,
  getTicketById,
  getTicketByEmail,
  updateTicketById,
  deleteTicketById,
};
