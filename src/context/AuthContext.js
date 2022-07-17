import React, { useContext, useEffect } from 'react';

const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [laoding, setLoading] = React.useState(false);

    const logout = () => {
        const confirmation = window.confirm('Are you sure you want to logout?');
        if (confirmation) {
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem('data');
        };
    };

    useEffect(() => {
        setLoading(true);
        const data = localStorage.getItem('data');
        if (data) {
            setUser(JSON.parse(data))
            setIsAuthenticated(true);
        }
    }, []);
    useEffect(() => {
        setLoading(true);
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user))
        }
    }, []);
    return (
        <AuthContext.Provider
            value={{ isAuthenticated, user, setIsAuthenticated, setUser, logout, laoding }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
