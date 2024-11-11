import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/cauth';
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinnner';
import axios from 'axios';

const PrivateRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();


    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/auth/user-auth`);
            if (res.data.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        };
        if (auth?.token) authCheck();
    }, [auth?.token]);

    return ok ? <Outlet/> : <Spinner/>;
}

export default PrivateRoute
