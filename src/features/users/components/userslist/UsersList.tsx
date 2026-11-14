import { useUsers } from "../../hooks/useUsers";

function UsersList() {
  const { users, loading, error } = useUsers();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Users List</h2>

      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.username}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default UsersList;