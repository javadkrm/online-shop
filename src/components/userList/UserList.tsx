import useFetch from "../../hooks/useFetch";

interface User {
    id: string
    name: string
    phone: string
}

function UserList() {
    const { data: user, loading, error } = useFetch<User[]>('https://userlist/users')

    if (loading) {
        <p>loading...</p>
    }

    if (error) {
        <p>{error}</p>
    }

    return (
        <>
            <div>
                {user?.map(user => (
                    <div key={user.id}>
                        <h3>{user.name}</h3>
                        <p>{user.phone}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default UserList

