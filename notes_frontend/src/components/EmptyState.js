import { DocumentPlusIcon } from '@heroicons/react/24/outline';

// PUBLIC_INTERFACE
function EmptyState({ onNewNote }) {
  return (
    <div className="empty-state">
      <DocumentPlusIcon className="empty-icon" />
      <h2>No notes found</h2>
      <p>Create your first note to get started!</p>
      <button onClick={onNewNote} className="btn-primary">
        Create Note
      </button>
    </div>
  );
}

export default EmptyState;
