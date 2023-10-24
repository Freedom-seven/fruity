import { createContext, useContext, useState, useCallback } from "react";
import { authService } from "../services";

// Create an AuthContext
const AuthContext = createContext();

// Create the AuthProvider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Function to handle user login
  const login = useCallback(async (email, password) => {
    try {
      const loggedInUser = await authService.login(email, password);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (error) {
      throw error;
    }
  }, []);

  // Function to handle user signup
  const signup = useCallback(async (userData) => {
    try {
      const registeredUser = await authService.signup(userData);
      setUser(registeredUser);
      return registeredUser;
    } catch (error) {
      throw error;
    }
  }, []);

  // Function to handle user logout
  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      throw error;
    }
  }, []);

  // Derive isAuthenticated from the user state
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Create a custom hook for using the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
