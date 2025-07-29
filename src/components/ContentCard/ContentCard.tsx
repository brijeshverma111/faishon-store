import React from 'react';
import type { ContentItem } from '../../types/content';
import styles from './ContentCard.module.css';

interface Props {
  content: ContentItem;
}

export default function ContentCard({ content }: Props) {

  return (
    <div className={styles.card}>
      {content.imageUrl ? (
        <img 
          className={styles.image} 
          src={content.imageUrl} 
          alt={content.title}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.nextElementSibling?.classList.remove(styles.hidden);
          }}
          loading="lazy"
        />
      ) : null}
      <div className={`${styles.imagePlaceholder} ${content.imageUrl ? styles.hidden : ''}`}>
        <span>No Image</span>
      </div>
      <div className={styles.info}>
        <div className={styles.infoLeft}>   
          <div className={styles.title}>{content.title || 'Untitled'}</div>
          <div className={styles.user}>{content.userName || 'Unknown User'}</div>
        </div>
        <div className={styles.priceOption}>
          {content.pricingOption === 'Paid' && content.price !== undefined ? (
            <span className={styles.price}>${content.price.toFixed(2)}</span>
          ) : content.pricingOption === 'Free' ? (
            <span className={styles.free}>FREE</span>
          ) : (
            <span className={styles.viewOnly}>View Only</span>
          )}
        </div>
      </div>
    </div>
  );
}
