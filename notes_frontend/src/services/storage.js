/**
 * Storage service for notes using localStorage.
 * Provides simple load/save operations. If localStorage is unavailable,
 * it gracefully falls back to a no-op in-memory store for the session.
 */

const STORAGE_KEY = 'notes_app.notes.v1';

let memoryStore = [];

// PUBLIC_INTERFACE
export function loadNotes() {
  /** Load notes from localStorage (or memory fallback). */
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(n => ({
      id: n.id,
      title: n.title || '',
      content: n.content || '',
      createdAt: Number(n.createdAt) || Date.now(),
      updatedAt: Number(n.updatedAt) || Number(n.createdAt) || Date.now(),
    }));
  } catch {
    // Fallback to memory store
    return memoryStore;
  }
}

// PUBLIC_INTERFACE
export function saveNotes(notes) {
  /** Save notes array to localStorage (or memory fallback). */
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes || []));
  } catch {
    memoryStore = Array.isArray(notes) ? [...notes] : [];
  }
}
