import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import NotesList from './components/NotesList';
import NoteEditorModal from './components/NoteEditorModal';
import EmptyState from './components/EmptyState';
import { loadNotes, saveNotes } from './services/storage';

/**
 * Note type
 * @typedef {Object} Note
 * @property {string} id - Unique identifier (timestamp-based string).
 * @property {string} title - Note title.
 * @property {string} content - Note body content.
 * @property {number} createdAt - Creation timestamp (ms since epoch).
 * @property {number} updatedAt - Last update timestamp (ms since epoch).
 */

// PUBLIC_INTERFACE
function App() {
  /**
   * App state and logic for personal notes management with:
   * - CRUD operations
   * - Search
   * - Time range filtering and sort
   * - LocalStorage persistence
   * - Responsive layout with Top Nav, Sidebar, and Main panel
   */

  // Core state
  const [notes, setNotes] = useState(
    () => {
      try {
        return loadNotes();
      } catch {
        return [];
      }
    }
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRange, setFilterRange] = useState('all'); // 'all' | '7' | '30'
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' | 'asc'

  // Modal/editor state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null); // null for new

  // Persist to localStorage whenever notes change
  useEffect(() => {
    try {
      saveNotes(notes);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed to save notes:', e);
    }
  }, [notes]);

  // Derived: filtered and sorted notes
  const visibleNotes = useMemo(() => {
    const now = Date.now();
    const rangeMap = {
      '7': 7 * 24 * 60 * 60 * 1000,
      '30': 30 * 24 * 60 * 60 * 1000
    };
    let list = [...notes];

    // Filter by range
    if (filterRange !== 'all' && rangeMap[filterRange]) {
      const cutoff = now - rangeMap[filterRange];
      list = list.filter(n => (n.updatedAt || n.createdAt) >= cutoff);
    }

    // Search filter
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(n =>
        (n.title || '').toLowerCase().includes(q) ||
        (n.content || '').toLowerCase().includes(q)
      );
    }

    // Sort by updatedAt (fallback createdAt)
    list.sort((a, b) => {
      const ta = a.updatedAt || a.createdAt || 0;
      const tb = b.updatedAt || b.createdAt || 0;
      return sortOrder === 'asc' ? ta - tb : tb - ta;
    });

    return list;
  }, [notes, searchQuery, filterRange, sortOrder]);

  // PUBLIC_INTERFACE
  const handleOpenNew = () => {
    setEditingNote(null);
    setIsEditorOpen(true);
  };

  // PUBLIC_INTERFACE
  const handleEdit = (note) => {
    setEditingNote(note);
    setIsEditorOpen(true);
  };

  // PUBLIC_INTERFACE
  const handleDelete = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  // PUBLIC_INTERFACE
  const handleSave = (data) => {
    // data: { id?, title, content }
    if (data.id) {
      // update existing
      setNotes(prev => prev.map(n => {
        if (n.id !== data.id) return n;
        return {
          ...n,
          title: data.title,
          content: data.content,
          updatedAt: Date.now()
        };
      }));
    } else {
      // create new
      const timestamp = Date.now();
      const newNote = {
        id: `${timestamp}-${Math.random().toString(36).slice(2, 8)}`,
        title: data.title?.trim() || 'Untitled',
        content: data.content || '',
        createdAt: timestamp,
        updatedAt: timestamp
      };
      setNotes(prev => [newNote, ...prev]);
    }
    setIsEditorOpen(false);
    setEditingNote(null);
  };

  // PUBLIC_INTERFACE
  const handleCancelEdit = () => {
    setIsEditorOpen(false);
    setEditingNote(null);
  };

  return (
    <div className="app-root">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewNote={handleOpenNew}
      />

      <div className="app-layout">
        <aside className="sidebar">
          <Sidebar
            filterRange={filterRange}
            onFilterChange={setFilterRange}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
            totalCount={notes.length}
            visibleCount={visibleNotes.length}
          />
        </aside>

        <main className="main">
          {visibleNotes.length === 0 ? (
            <EmptyState onNewNote={handleOpenNew} />
          ) : (
            <NotesList
              notes={visibleNotes}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </main>
      </div>

      <NoteEditorModal
        isOpen={isEditorOpen}
        note={editingNote}
        onSave={handleSave}
        onCancel={handleCancelEdit}
      />
    </div>
  );
}

export default App;
