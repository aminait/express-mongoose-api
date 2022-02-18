export const getAllUsers = async (req, res) => {
  res.json({ message: 'getAllUsers' });
};

export const createNewUser = async (req, res) => {
  res.json({ message: 'createNewUser' });
};

export const getUserById = async (req, res) => {
  res.json({ message: 'getUserById' });
};

export const deleteUserById = async (req, res) => {
  res.json({ message: 'deleteUserById' });
};

export const getCurrentUser = async (req, res) => {
  res.json({ message: 'getCurrentUser' });
};

export const changeUserPassword = async (req, res) => {
  res.json({ message: 'changeUserPassword' });
};

export const recoverUserPassword = async (req, res) => {
  res.json({ message: 'recoverUserPassword' });
};
