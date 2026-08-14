import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { createUser } from '../api/userApi';

export default function CreateUser() {
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(payload) {
    setServerError('');
    try {
      const user = await createUser(payload);
      navigate(`/users/${user.id}`);
    } catch (err) {
      setServerError(err.message);
    }
  }

  return (
    <div className="card">
      <div className="top-actions">
        <h2 style={{ margin: 0 }}>Add User</h2>
        <Link className="btn btn-secondary" to="/">
          Cancel
        </Link>
      </div>
      <UserForm onSubmit={handleSubmit} submitLabel="Create User" serverError={serverError} />
    </div>
  );
}
