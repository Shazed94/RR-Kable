

import { Navigate, useLocation } from 'react-router-dom';


export default function AdminPrivateRoute({ children }) {



    const admin = localStorage.getItem('adminemail');
    
    const location = useLocation();

    // return authUser.email ? children : <Navigate to="/user/login" replace state={{from: location}}/>;
    return admin? children : <Navigate to="/admin/login" replace state={{from: location}}/>;


}