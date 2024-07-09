import { useAppSelector } from "../../state/hooks"

export default function User() {
    const user = useAppSelector((state) => state.user);

    switch (user.status) {
        case 'loading':
            return <p>Loading user...</p>
        case 'finished':
            if (user.data) {
                return <p>Hello, {user.data.name}</p>
            } else {
                console.log(user.errorMessage)
                return <p>No user found.</p>
            }
        case 'error':
            console.log(user.errorMessage)
            return <p>No user found.</p>
    }
}