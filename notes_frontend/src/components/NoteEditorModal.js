import Modal from 'react-modal';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

// Bind modal to app root for accessibility
Modal.setAppElement('#root');

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    position: 'relative',
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    maxWidth: '600px',
    width: '90%',
    padding: '24px',
    borderRadius: '8px',
    backgroundColor: 'var(--background)'
  }
};

// PUBLIC_INTERFACE
function NoteEditorModal({ isOpen, note, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
    } else {
      setTitle('');
      setContent('');
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: note?.id,
      title: title.trim() || 'Untitled',
      content: content.trim()
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      style={modalStyles}
      contentLabel="Note Editor"
    >
      <form onSubmit={handleSubmit} className="note-editor">
        <div className="editor-header">
          <h2>{note ? 'Edit Note' : 'New Note'}</h2>
          <button 
            type="button" 
            onClick={onCancel}
            className="close-btn"
          >
            <XMarkIcon className="btn-icon" />
          </button>
        </div>

        <div className="editor-content">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
              className="title-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
              className="content-input"
              rows={8}
            />
          </div>
        </div>

        <div className="editor-footer">
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default NoteEditorModal;
