import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import AuthorizationForm from "../authorizationForm/AuthorizationForm";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";

const App = () => {
    const [token, setToken] = useState('');
    const [signIn, setSignIn] = useState(false);

    return (
        <Routes>
            <Route path="/" element={<AuthorizationForm setToken={setToken} setSignIn={setSignIn}/>}/>
            <Route path="/dashboard" element={<ProtectedRoute signIn={signIn} token={token}></ProtectedRoute>}/>
            <Route path="*" element={<Navigate to="/" replace />}/>
        </Routes>
    );
}

export default App;