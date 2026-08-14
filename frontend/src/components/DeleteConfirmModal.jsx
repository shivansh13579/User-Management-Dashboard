export default function DeleteConfirmModal({
  isOpen,
  onCancel,
  onConfirm,
  loading = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div
        className="confirm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-user-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 id="delete-user-title">Delete user?</h3>
        <p>Delete this user? This cannot be undone.</p>

        <div className="confirm-actions">
          <button
            className="btn btn-primary confirm-primary"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "OK"}
          </button>
          <button
            className="btn btn-secondary confirm-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
