import { useState, useEffect, useContext, createContext } from "react";
import axios from 'axios'
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ''
    });

    // Default axios
    axios.defaults.headers.common["Authorization"] = auth?.token;

    useEffect(() => {
        const data = localStorage.getItem('auth');
        if (data) {
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token
            })
        }
    }, [])

    return (
        <AuthContext.Provider value={[auth, setAuth]} >{children}</AuthContext.Provider>
    )
}

// Custom hook
const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider }