
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

export default function PrivateRoute({ children }) {


    const {authUser, setAuthUser} = useContext(UserContext);
    const user = localStorage.getItem('email');
    setAuthUser(user);
    // console.log(user);
    const location = useLocation();
    return user? children : <Navigate to="/user/reg" replace state={{from: location}}/>;


}