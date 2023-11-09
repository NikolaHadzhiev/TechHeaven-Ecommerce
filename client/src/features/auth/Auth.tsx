import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks/reduxHooks";
import { toast } from "react-toastify";

interface Props{
    roles?: string[];
}

const Auth = ({roles}: Props) => {
    const { user } = useAppSelector(state => state.account);
    const location = useLocation();

    if(!user) return <Navigate to='/login' state={{from: location}} />

    if(roles && !roles.some(r => user.roles?.includes(r))) {
        toast.error("Not authorized to access this area");
        return <Navigate to='/catalog' />
    }
    
    return <Outlet />
}

export default Auth