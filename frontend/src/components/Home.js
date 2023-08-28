import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, removeSuccessMessage } from '../store/asyncMethods/AuthMethods';
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
        dispatch(removeSuccessMessage())
    }, [successMessage]);

    return (
        <div>
            <Toaster
                position='top-center' reverseOrder={false}
                toastOptions={{
                    style: {
                        fontSize: '14px',
                    },
                }}
            />
            <div>Home---{user.fullName} </div>
            <div onClick={hanldeLogout}>Logout</div>
        </div>
    )
}

export default Home