import { Navigate } from "react-router-dom";

import DashBoard from "../dashboard/DashBoard";

const ProtectedRoute = ({ signIn, token }) => {
    if (signIn) return <DashBoard token={token}/>;
    else return <Navigate to="/"/>;
}

export default ProtectedRoute;