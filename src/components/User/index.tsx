import React from 'react'
import { useAppSelector } from "../../state/hooks"

// User information
export default function User() {
    const user = useAppSelector((state) => state.user);

    switch (user.status) {
        case 'loading': // Getting user data from db
            return <p>Loading user...</p>
        case 'finished': // Successfully retrieved user data from db
            if (user.data) {
                return <p>Hello, {user.data.name}</p>
            } else {
                console.log(user.errorMessage)
                return <p>No user found.</p>
            }
        case 'error': // Error retrieving user data from db
            console.log(user.errorMessage)
            return <p>No user found.</p>
    }
}