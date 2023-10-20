import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks/reduxHooks";


const Auth = () => {
    const { user } = useAppSelector(state => state.account);
    const location = useLocation();

    if(!user) return <Navigate to='/login' state={{from: location}} />

    return <Outlet />
}

export default Auth