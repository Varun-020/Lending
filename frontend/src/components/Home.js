import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/asyncMethods/AuthMethods';
import { REMOVE_SUCCESS_MESSAGE } from '../store/types/UserTypes';
import toast, { Toaster } from 'react-hot-toast';


function Home() {
    const dispatch = useDispatch();
    const { user, successMessage } = useSelector((state) => state.AuthReducer);

    const hanldeLogout = () => {
        dispatch(logout(user));
    }

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
        }
        dispatch({ type: REMOVE_SUCCESS_MESSAGE })
    }, [successMessage]);

    return (
        <div>
            <Toaster
                position='top-right' reverseOrder={false}
                toastOptions={{
                    style: {
                        fontSize: '14px',
                    },
                }}
            />
            <div>Home</div>
            <div onClick={hanldeLogout}>Logout</div>
        </div>
    )
}

export default Home