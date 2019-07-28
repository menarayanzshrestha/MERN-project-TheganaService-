
import { getJwt } from './getJwt';

const getRole = () => {

    const JWT = getJwt();

    // authenticate user role

    if(JWT === null) {
        return null;
    }

    let token = JWT.token;
    
    let role = JSON.parse(window.atob(token.split(".")[1])).role;

    if(role === "admin") {
        return "admin";
    }
    else if(role === "manager") {
        return "manager";
    }
    else{
        return "developer";
    }

}

const getUserId = () => {

    const JWT = getJwt();

    if(JWT === null) {
        return null;
    }

    let token = JWT.token;
    // console.log(window.atob(token.split(".")[1]));
    return JSON.parse(window.atob(token.split(".")[1]))._id;

}

const getEmail = () => {

    const JWT = getJwt();

    if(JWT === null) {
        return null;
    }

    let token = JWT.token;
    
    return JSON.parse(window.atob(token.split(".")[1])).email;

}

const authenticateSession = () => {

    const JWT = getJwt();

    if(JWT === null) {
        return false;
    }

    

    // let expirationTime = JSON.parse(window.atob(token.split(".")[1])).exp;
    // let expirationTime = JSON.parse(window.atob(token.split(".")[1])).exp;
    try{
        let token = JWT.token;
        let expirationTime = JSON.parse(window.atob(token.split(".")[1])).exp;
        //if invalid token then parsing will give back error .......so used try catch to avoid the error

        let now = Date.now() || new Date().getTime();
        now = now / 1000; //convert timestamp to seconds

        if(expirationTime - now < 1) {
            return false;
        }
    }
    catch {
        return false;
    }
    

    return true;

}

export {
    getRole,
    authenticateSession,
    getUserId,
    getEmail
}