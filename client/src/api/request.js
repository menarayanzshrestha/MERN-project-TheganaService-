import axios from 'axios';
import { getJwt } from './getJwt';

axios.defaults.baseURL = 'http://localhost:8080/';
// axios.defaults.baseURL = '/';

export const setDefaults = () => {
    if(getJwt() !== null) { 

        // console.log(getJwt().token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${getJwt().token}`;
    }
}

setDefaults();

const CANCEL_TOKEN = axios.CancelToken;
let source = null;

const _request = (url, method = "get", data = {}, headers = {}) => {

    if(source !== null) {

        // _cancelOnGoingRequest();

    }
    else {

        source = CANCEL_TOKEN.source();

    }

    switch(method) {

        case "get":

            return axios.get(url, {
                cancelToken: source.token
            });

        case "post":
        
            return axios.post(url, data, headers, {
                    cancelToken: source.token
                } 
            );

        case "put":

            return axios.put(url, data, headers, {
                cancelToken: source.token
            });

        case "patch":

            return axios.patch(url, data, headers, {
                cancelToken: source.token
            });
        
        case "delete":
    
            return axios.delete(url, headers);

        default:    

    }

}


// cancel http requests before getting response
export const _cancelOnGoingRequest = () => {

    source.cancel('request cancelled');

}

export const _isCancellationError = (error) => {

    return axios.isCancel(error);

}

export default _request;