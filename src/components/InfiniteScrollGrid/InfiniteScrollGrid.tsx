import React, { useRef, useEffect, useCallback } from 'react';
import type { ContentItem } from '../../types/content';
import ContentCard from '../ContentCard/ContentCard';
import styles from './InfiniteScrollGrid.module.css';

interface Props {
  items: ContentItem[];
  onLoadMore: () => void;
  hasMore: boolean;
  loading: boolean;
}

export default function InfiniteScrollGrid({ items, onLoadMore, hasMore, loading }: Props) {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !loading) {
      onLoadMore();
    }
  }, [hasMore, loading, onLoadMore]);

  useEffect(() => {
    const option = { root: null, rootMargin: '20px', threshold: 0 };
    const observer = new window.IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => { if (loaderRef.current) observer.unobserve(loaderRef.current); };
  }, [handleObserver]);

  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <ContentCard key={item.id} content={item} />
      ))}
      <div ref={loaderRef} className={styles.loader} />
    </div>
  );
}
