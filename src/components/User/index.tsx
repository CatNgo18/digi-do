import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { getUserById } from "../../state/user/userSlice";

type UserProps = {
    userId: number;
}

export default function User({ userId }: UserProps) {
    const user = useAppSelector((state) => state.user) // Current user
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUserById(userId))
    }, [userId])

    /* eslint-disable no-fallthrough */
    switch (user.status) {
        case 'loading':
            return <p>Loading...</p>
        case 'finished':
            if (user.data)
                return <p>Welcome, {user.data.name}!</p>
        // falls through to 'error'
        case 'error':
            console.log(user.errorMessage);
            return <p>No user found.</p>
    }
    /* eslint-enable no-fallthrough */
}