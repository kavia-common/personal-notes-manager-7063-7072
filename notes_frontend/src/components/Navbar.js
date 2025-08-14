import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';

// PUBLIC_INTERFACE
function Navbar({ searchQuery, onSearchChange, onNewNote }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">Notes</h1>
        
        <div className="navbar-search">
          <MagnifyingGlassIcon className="search-icon" />
          <input
            type="search"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>

        <button onClick={onNewNote} className="btn-new">
          <PlusIcon className="btn-icon" />
          <span>New Note</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
