import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSearch } from '../../features/contents/contentsSelectors';
import { setSearch } from '../../features/contents/contentsSlice';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const search = useSelector(selectSearch);
  const dispatch = useDispatch();
  const [input, setInput] = useState(search);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    dispatch(setSearch(e.target.value));
  };

  return (
    <div className={styles.searchBar}>
      <input
        className={styles.input}
        type="text"
        placeholder="Find the Items you're lookng for"
        value={input}
        onChange={handleChange}
      />
      <span className={styles.icon}>🔍</span>
    </div>
  );
}
