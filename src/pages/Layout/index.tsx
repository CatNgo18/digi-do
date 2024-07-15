import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { getUserById } from "../../state/user/userSlice";
import { Link, Outlet } from "react-router-dom";
import User from "../../components/User";

// Common elements throughout all pages
export default function Layout() {
    const user = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (import.meta.env.DEV) {
            dispatch(getUserById(import.meta.env.VITE_USER_ID))
        } else {
            if (user.data)
                dispatch(getUserById(user.data.id))
        }
    }, [user.data])

    return (
        <>
            <Link to='/'>
                <h1>Digi-Do</h1>
            </Link>
            
            <User />

            <Outlet />
        </>
    )
}