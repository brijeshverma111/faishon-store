import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FilterBar from './components/FilterBar/FilterBar';
import SearchBar from './components/SearchBar/SearchBar';
import SortDropdown from './components/SortDropdown/SortDropdown';
import InfiniteScrollGrid from './components/InfiniteScrollGrid/InfiniteScrollGrid';
import SkeletonLoader from './components/SkeletonLoader/SkeletonLoader';
import { fetchContentsThunk } from './features/contents/contentsThunks';
import { selectFilteredContents, selectStatus, selectError, selectFilters, selectSearch } from './features/contents/contentsSelectors';
import { setFilters, setSearch } from './features/contents/contentsSlice';
import './App.css';
import type { AppDispatch } from './store';
import queryString from 'query-string';

const PAGE_SIZE = 16;

function App() {
  const dispatch: AppDispatch = useDispatch();
  const allItems = useSelector(selectFilteredContents);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const filters = useSelector(selectFilters);
  const search = useSelector(selectSearch);
  const [page, setPage] = useState(1);

  // On mount: initialize filters/search from URL
  useEffect(() => {
    const params = queryString.parse(window.location.search, { arrayFormat: 'comma' });
    if (params.filters) {
      const filterArr = Array.isArray(params.filters)
        ? params.filters
        : String(params.filters).split(',');
      const validFilters = filterArr.filter((f): f is string => Boolean(f));
      dispatch(setFilters(validFilters as any));
    }
    if (params.search) {
      dispatch(setSearch(String(params.search)));
    }
  }, [dispatch]);

  // On filters/search change: update URL
  useEffect(() => {
    const params: any = {};
    if (filters.length > 0) params.filters = filters;
    if (search) params.search = search;
    const newQuery = queryString.stringify(params, { arrayFormat: 'comma' });
    const newUrl = newQuery ? `?${newQuery}` : window.location.pathname;
    window.history.replaceState(null, '', newUrl);
  }, [filters, search]);

  // Load data on mount
  useEffect(() => {
    dispatch(fetchContentsThunk());
  }, [dispatch]);

  // Reset page when filters/search change
  useEffect(() => {
    setPage(1);
  }, [allItems.length]);

  // Infinite scroll: load more items
  const handleLoadMore = useCallback(() => {
    if (page * PAGE_SIZE < allItems.length) {
      setPage((p) => p + 1);
    }
  }, [page, allItems.length]);

  const pagedItems = allItems.slice(0, page * PAGE_SIZE);
  const hasMore = pagedItems.length < allItems.length;
  const isLoading = status === 'loading' || status === undefined;

  return (
    <>
    <div className="logo">CONECT</div>
    <div className="store-container">
      <header className="store-header">
        <div className="search-bar-wrapper">
          <SearchBar />
        </div>
      </header>
      <section className="filter-section">
        <FilterBar />
      </section>
      <div className="sort-section">
        <SortDropdown />
      </div>
      <section className="contents-section">
        {isLoading ? (
          <SkeletonLoader count={PAGE_SIZE} />
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <InfiniteScrollGrid
            items={pagedItems}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            loading={isLoading}
          />
        )}
      </section>
    </div>
    </>
  );
}

export default App;
