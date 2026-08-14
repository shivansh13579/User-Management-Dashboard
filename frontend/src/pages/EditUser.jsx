import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { fetchUserById, updateUser } from '../api/userApi';

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    fetchUserById(id)
      .then(setUser)
      .catch((err) => setLoadError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(payload) {
    setServerError('');
    try {
      await updateUser(id, payload);
      navigate(`/users/${id}`);
    } catch (err) {
      setServerError(err.message);
    }
  }

  if (loading) return <div className="loading">Loading user...</div>;
  if (loadError) return <div className="error-banner">{loadError}</div>;

  return (
    <div className="card">
      <div className="top-actions">
        <h2 style={{ margin: 0 }}>Edit User</h2>
        <Link className="btn btn-secondary" to={`/users/${id}`}>
          Cancel
        </Link>
      </div>
      <UserForm initialUser={user} onSubmit={handleSubmit} submitLabel="Save Changes" serverError={serverError} />
    </div>
  );
}
