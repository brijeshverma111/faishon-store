import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSorting } from '../../features/contents/contentsSelectors';
import { setSorting } from '../../features/contents/contentsSlice';
import styles from './SortDropdown.module.css';

const SORT_OPTIONS = [
  { value: 'name', label: 'Item Name' },
  { value: 'priceHigh', label: 'Higher Price' },
  { value: 'priceLow', label: 'Lower Price' },
];

export default function SortDropdown() {
  const sorting = useSelector(selectSorting);
  const dispatch = useDispatch();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSorting(e.target.value as 'name' | 'priceHigh' | 'priceLow'));
  };

  return (
    <div className={styles.sortWrapper}>
      <label className={styles.sortLabel} htmlFor="sort-select">Sort by</label>
      <select
        id="sort-select"
        className={styles.sortSelect}
        value={sorting}
        onChange={handleSortChange}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
