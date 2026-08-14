import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUsers, deleteUser } from "../api/userApi";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteConfirm() {
    if (deleteTargetId == null) return;

    setDeleting(true);
    try {
      await deleteUser(deleteTargetId);
      setUsers((prev) => prev.filter((u) => u.id !== deleteTargetId));
      setDeleteTargetId(null);
    } catch (err) {
      setError(err.message);
      setDeleteTargetId(null);
    } finally {
      setDeleting(false);
    }
  }

  function openDeleteModal(id) {
    setDeleteTargetId(id);
  }

  return (
    <div>
      <div className="top-actions">
        <span>
          {users.length} user{users.length !== 1 ? "s" : ""}
        </span>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/users/new")}
        >
          + Add User
        </button>
      </div>

      {error && <div className="error-banner">{error}</div>}
      {loading && <div className="loading">Loading users...</div>}

      {!loading && users.length === 0 && (
        <div className="card empty-state">
          No users yet. Add your first user to get started.
        </div>
      )}

      {!loading && users.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td data-label="Name">
                  <Link to={`/users/${u.id}`}>{u.name}</Link>
                </td>
                <td data-label="Email">{u.email}</td>
                <td data-label="Phone">{u.phone}</td>
                <td data-label="Company">{u.company || "—"}</td>
                <td data-label="Actions">
                  <div className="row-actions">
                    <Link
                      className="btn btn-secondary"
                      to={`/users/${u.id}/edit`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => openDeleteModal(u.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <DeleteConfirmModal
        isOpen={deleteTargetId !== null}
        onCancel={() => setDeleteTargetId(null)}
        onConfirm={handleDeleteConfirm}
        loading={deleting}
      />
    </div>
  );
}
