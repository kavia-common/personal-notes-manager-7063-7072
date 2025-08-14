import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// PUBLIC_INTERFACE
function NotesList({ notes, onEdit, onDelete }) {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="notes-list">
      {notes.map(note => (
        <div key={note.id} className="note-card">
          <div className="note-content">
            <h3 className="note-title">{note.title}</h3>
            <p className="note-preview">
              {note.content.length > 150 
                ? `${note.content.substring(0, 150)}...` 
                : note.content}
            </p>
            <div className="note-meta">
              <span>Created: {formatDate(note.createdAt)}</span>
              {note.updatedAt > note.createdAt && (
                <span>Updated: {formatDate(note.updatedAt)}</span>
              )}
            </div>
          </div>
          
          <div className="note-actions">
            <button 
              onClick={() => onEdit(note)} 
              className="action-btn edit"
              title="Edit note"
            >
              <PencilIcon className="btn-icon" />
            </button>
            <button 
              onClick={() => onDelete(note.id)} 
              className="action-btn delete"
              title="Delete note"
            >
              <TrashIcon className="btn-icon" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotesList;
