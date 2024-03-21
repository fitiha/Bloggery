import { jwtDecode } from 'jwt-decode';
import { clearState } from "../redux/slices/currentUserSlice";
import sessionExpired from "../redux/slices/currentUserSlice";


const checkTokenExpirationMiddleware = store => next => action => {
    const token = localStorage.getItem('token');

    if (token) {
        const decodedToken = jwtDecode(token);

        if (decodedToken.exp < Date.now() / 1000) {
            localStorage.clear();
            store.dispatch(clearState());
            store.dispatch(sessionExpired());
        }
    }
    next(action);
};

export default checkTokenExpirationMiddleware;