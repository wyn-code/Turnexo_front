import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "turnexo_auth";
const USERS_KEY = "turnexo_users";

interface StoredUser {
  id: string;
  email: string;
  name: string;
  password: string;
}

function getStoredUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const users = getStoredUsers();
    const found = users.find((u) => u.email === email.toLowerCase().trim());
    if (!found) return { success: false, error: "No existe una cuenta con ese email." };
    if (found.password !== password) return { success: false, error: "Contraseña incorrecta." };
    const sessionUser = { id: found.id, email: found.email, name: found.name };
    setUser(sessionUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
    return { success: true };
  };

  const register = async (name: string, email: string, password: string) => {
    const users = getStoredUsers();
    const normalizedEmail = email.toLowerCase().trim();
    if (users.find((u) => u.email === normalizedEmail)) {
      return { success: false, error: "Ya existe una cuenta con ese email." };
    }
    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      email: normalizedEmail,
      name: name.trim(),
      password,
    };
    saveUsers([...users, newUser]);
    const sessionUser = { id: newUser.id, email: newUser.email, name: newUser.name };
    setUser(sessionUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
