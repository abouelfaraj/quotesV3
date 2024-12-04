import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem('currentUser');
        if (user) {
            try {
                setCurrentUser(JSON.parse(user));
            } catch (error) {
                console.error("Failed to parse user data from localStorage:", error);
                localStorage.removeItem('currentUser');
            }
        }
    }, []);

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
    };

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);