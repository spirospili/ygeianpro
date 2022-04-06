import React, {Component} from "react";

const AuthContext = React.createContext()

export class AuthContextProvider extends Component {
    state = {
        isAuthenticated: localStorage.getItem('auth')
    };

    logIn = () => {
        localStorage.setItem("auth", true);
        this.setState({isAuthenticated: true});
    }

    logOut = () => {
        localStorage.removeItem("auth");
        this.setState({isAuthenticated: false});
    }

    render(){
        const {isAuthenticated} = this.state;
        const {logIn, logOut} = this;
        return (
            <AuthContext.Provider value={{
                isAuthenticated,
                logIn,
                logOut
            }} >{this.props.children}</AuthContext.Provider>
        )
    }
}

export default AuthContext;