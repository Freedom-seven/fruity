// authService.js

// Simulated user data for demonstration purposes
const users = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@fruity.com",
    password: "password123",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@fruity.com",
    password: "password456",
  },
];

// Simulated authentication service
const authService = {
  // Login function
  login: async (email, password) => {
    try {
      // Simulate a delay to mimic an async operation (e.g., API request)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Find the user with the provided email
      const user = users.find((u) => u.email === email);

      // Check if the user exists and the password is correct
      if (user && user.password === password) {
        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      throw error;
    }
  },

  // Signup function
  signup: async (userData) => {
    try {
      // Simulate a delay to mimic an async operation (e.g., API request)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if the email is already registered
      const existingUser = users.find((u) => u.email === userData.email);
      if (existingUser) {
        throw new Error("Email already in use");
      }

      // Create a new user
      const newUser = {
        id: users.length + 1,
        ...userData,
      };
      users.push(newUser);

      return {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      };
    } catch (error) {
      throw error;
    }
  },

  // Logout function (can be implemented as needed)
  logout: () => {
    // Implement logout logic here if needed
  },

  // Additional authentication-related functions can be added here
};

export default authService;
