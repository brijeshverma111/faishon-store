import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilters, selectPriceRange } from '../../features/contents/contentsSelectors';
import { setFilters, resetFilters, setPriceRange } from '../../features/contents/contentsSlice';
import type { PricingOption } from '../../types/content';
import styles from './FilterBar.module.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const PRICING_OPTIONS: PricingOption[] = ['Paid', 'Free', 'View Only'];

export default function FilterBar() {
  const filters = useSelector(selectFilters);
  const priceRange = useSelector(selectPriceRange);
  const dispatch = useDispatch();

  const handleChange = (option: PricingOption) => {
    if (filters.includes(option)) {
      dispatch(setFilters(filters.filter((f) => f !== option)));
    } else {
      dispatch(setFilters([...filters, option]));
    }
  };

  const handleSliderChange = (range: number | number[]) => {
    if (Array.isArray(range)) {
      dispatch(setPriceRange([range[0], range[1]]));
    }
  };

  const paidSelected = filters.includes('Paid');

  return (
    <div className={styles.filterBar}>
      <div className={styles.pricingSection}>
        <span className={styles.label}>Pricing Option</span>
        {PRICING_OPTIONS.map((option) => (
          <label key={option} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={filters.includes(option)}
              onChange={() => handleChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
      
      <div className={styles.sliderWrapper}>
        <span className={styles.sliderLabel}>Pricing slider</span>
        <span className={styles.sliderValue}>${priceRange[0]}</span>
        <Slider
          range
          min={0}
          max={999}
          value={priceRange}
          onChange={handleSliderChange}
          disabled={!paidSelected}
          allowCross={false}
          className={styles.slider}
        />
        <span className={styles.sliderValue}>${priceRange[1]}</span>
      </div>
      
      <button className={styles.resetBtn} onClick={() => dispatch(resetFilters())}>
        RESET
      </button>
    </div>
  );
}