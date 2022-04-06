import React, {useState} from "react";

const AuthContext = React.createContext({
    token: '',
  isAuthenticated: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);

    const userIsAuthenticated = !!token;

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
      };
    
    const logoutHandler = () => {
       setToken(null);
       localStorage.removeItem('token')
    };

    const contextValue = {
        token: token,
        isAuthenticated: userIsAuthenticated,
        login: loginHandler,
        logout: logoutHandler,
      };

    return (
        <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
    )
}

export default AuthContext;