import React from 'react';
import styles from './SkeletonLoader.module.css';

interface Props {
  count?: number;
}

export default function SkeletonLoader({ count = 8 }: Props) {
  return (
    <div className={styles.skeletonGrid}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.skeletonCard}>
          <div className={styles.skeletonImage} />
          <div className={styles.skeletonText} />
          <div className={styles.skeletonTextShort} />
        </div>
      ))}
    </div>
  );
}
