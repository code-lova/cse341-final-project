const createHttpError = require("http-errors");
const userService = require("../services/userService");

// Register a new user
exports.registerUser = async (req, res, next) => {
  /*
      #swagger.tags = ['Users']
      #swagger.summary = 'Create a new user. EveryOne can create an account'
      #swagger.description = 'Creates a new user'.
      #swagger.parameters['body'] = {
        in: 'body',
        description: 'User details',
        required: true,
        schema: { $ref: '#/definitions/UserInput' }
      }
      #swagger.responses[400] = { description: 'Validation Error' }
      #swagger.responses[500] = { description: 'Failed to create user' }
    */
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return next(createHttpError(409, "User already exists"));
    }

    // Create new user
    const newUser = await userService.createUser({ name, email, password, role });
    if (!newUser) {
      return next(createHttpError(500, "Failed to create new user"));
    }

    return res.status(201).json({ newUser, message: "User Created successfully" });
  } catch (error) {
    next(error);
  }
};

// Update a user
exports.updateUser = async (req, res, next) => {
  /*
      #swagger.tags = ['Users']
      #swagger.summary = 'Update user by Id. Accessible to all logged-in users'
      #swagger.description = 'Updates an existing User.  Will Requires Google OAuth2 authentication. later'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'User ID',
        required: true,
        type: 'string'
      }
      #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated User details',
        required: true,
        schema: { $ref: '#/definitions/UserInput' }
      }
    */
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(createHttpError(400, "Request body cannot be empty"));
  }

  const id = req.params.id;

  try {
    const updatedUser = await userService.updateUser(id, req.body);
    if (!updatedUser) {
      throw createHttpError(404, "Task not found");
    }
    return res.json({
      updatedUser,
      message: "User updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Fetch all users details task for Andre
exports.getUsers = async (req, res, next) => {
  /*
      #swagger.tags = ['Users']
      #swagger.summary = 'Retrieve all User'
      #swagger.description = 'Fetches all users from the database. Will Requires Google OAuth2 authentication'
      #swagger.security = [{ BearerAuth: [] }]
      #swagger.responses[200] = {
        description: 'List of User retrieved successfully',
        schema: { $ref: '#/definitions/User' }
      }
      #swagger.responses[401] = { description: 'Unauthorized: Invalid token or user not authenticated' }
      #swagger.responses[404] = { description: 'No user data found' }
      #swagger.responses[500] = { description: 'Server error' }
    */
  
      // WRITE THE CODE TO COMPLETE THIS FUNCTION 
      
};

// fetch User by id - Task for Andre
exports.getUserById = async (req, res, next) => {
  /*
      #swagger.tags = ['Users']
      #swagger.summary = 'Retrieve a User by ID..'
      #swagger.description = 'Fetches User details by ID. Will Requires Google OAuth2 authentication.'
      
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the User to retrieve',
        required: true,
        type: 'string'
      }
      #swagger.responses[200] = {
        description: 'User details retrieved successfully',
        schema: { $ref: '#/definitions/User' }
      }
      #swagger.responses[401] = { description: 'Unauthorized: Invalid token or user not authenticated' }
      #swagger.responses[404] = { description: 'User not found' }
      #swagger.responses[500] = { description: 'Failed to fetch user details' }
    */

      // WRITE THE CODE TO COMPLETE THIS FUNCTION - TASK FOR ANDRE
 
};

//Delete a user
exports.deleteUser = async (req, res, next) => {
  /*
      #swagger.tags = ['Users']
      #swagger.summary = 'Delete a Users.'
      #swagger.description = 'Deletes a User from the database by ID. Will Requires Google OAuth2 authentication'
     
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the Users to delete',
        required: true,
        type: 'string'
      }
      #swagger.responses[401] = { description: 'Unauthorized: Invalid token or user not authenticated' }
      #swagger.responses[200] = { description: 'Users deleted successfully' }
      
      #swagger.responses[404] = { description: 'Users not found' }
      #swagger.responses[500] = { description: 'Failed to delete Users' }
    */
  const id = req.params.id;
  try {
    const deletedUser = await userService.deleteUser(id);
    if (!deletedUser) {
      return next(createHttpError(404, "User not found"));
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
