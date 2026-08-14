import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchUserById, deleteUser } from "../api/userApi";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchUserById(id)
      .then(setUser)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteUser(id);
      navigate("/");
    } catch (err) {
      setError(err.message);
      setShowDeleteModal(false);
    } finally {
      setDeleting(false);
    }
  }

  if (loading) return <div className="loading">Loading user...</div>;
  if (error) return <div className="error-banner">{error}</div>;
  if (!user) return null;

  const addr = user.address || {};
  const geo = addr.geo || {};

  return (
    <div className="card">
      <div className="top-actions">
        <h2 style={{ margin: 0 }}>{user.name}</h2>
        <div className="row-actions">
          <Link className="btn btn-secondary" to={`/users/${id}/edit`}>
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </button>
        </div>
      </div>

      <dl className="detail-grid">
        <dt>Email</dt>
        <dd>{user.email}</dd>
        <dt>Phone</dt>
        <dd>{user.phone}</dd>
        <dt>Company</dt>
        <dd>{user.company || "—"}</dd>
        <dt>Street</dt>
        <dd>{addr.street || "—"}</dd>
        <dt>City</dt>
        <dd>{addr.city || "—"}</dd>
        <dt>Zipcode</dt>
        <dd>{addr.zipcode || "—"}</dd>
        <dt>Geo</dt>
        <dd>
          {geo.lat ?? "—"}, {geo.lng ?? "—"}
        </dd>
      </dl>

      <div style={{ marginTop: 20 }}>
        <Link className="btn btn-secondary" to="/">
          ← Back to Dashboard
        </Link>
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}
