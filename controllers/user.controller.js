const db = require('../config/db.config');
const bcrypt = require('bcrypt');
const User = db.User;

// Controlador para el registro de usuario
exports.registerUser = async (req, res) => {
  const { email, password, rol } = req.body;

  if (!email || !password || !rol) {
    return res.status(400).json({ success: false, message: 'Email, password, and role are required.' });
  }

  try {
    // Encriptar la contraseña antes de guardarla
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Crear el usuario en la base de datos
    await User.create({
      email,
      password: hashedPassword,
      role: rol
    });

    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: 'An error occurred during registration.' });
  }
};

// Controlador para la autenticación de usuario
exports.authenticateUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({ success: true, message: 'Authentication successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
};
