import { FunnelIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

// PUBLIC_INTERFACE
function Sidebar({ 
  filterRange, 
  onFilterChange, 
  sortOrder, 
  onSortChange,
  totalCount,
  visibleCount 
}) {
  return (
    <div className="sidebar-container">
      <div className="sidebar-section">
        <h3 className="sidebar-title">
          <FunnelIcon className="sidebar-icon" />
          Filter by time
        </h3>
        <div className="filter-options">
          <button 
            className={`filter-btn ${filterRange === 'all' ? 'active' : ''}`}
            onClick={() => onFilterChange('all')}
          >
            All time
          </button>
          <button 
            className={`filter-btn ${filterRange === '7' ? 'active' : ''}`}
            onClick={() => onFilterChange('7')}
          >
            Last 7 days
          </button>
          <button 
            className={`filter-btn ${filterRange === '30' ? 'active' : ''}`}
            onClick={() => onFilterChange('30')}
          >
            Last 30 days
          </button>
        </div>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">Sort order</h3>
        <button 
          className="sort-btn"
          onClick={() => onSortChange(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          {sortOrder === 'asc' ? (
            <ArrowUpIcon className="sort-icon" />
          ) : (
            <ArrowDownIcon className="sort-icon" />
          )}
          {sortOrder === 'asc' ? 'Oldest first' : 'Newest first'}
        </button>
      </div>

      <div className="sidebar-stats">
        <p>Showing {visibleCount} of {totalCount} notes</p>
      </div>
    </div>
  );
}

export default Sidebar;
