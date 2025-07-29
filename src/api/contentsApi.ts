import type { ContentItem, PricingOption } from '../types/content';

// API enum mapping
const PRICING_OPTION_MAP: Record<number, PricingOption> = {
  0: 'Paid',
  1: 'Free',
  2: 'View Only',
};

// Type guard for API response
function isValidContentApiItem(item: any): item is any {
  return (
    typeof item === 'object' &&
    typeof item.id === 'string' &&
    typeof item.creator === 'string' &&
    typeof item.title === 'string' &&
    typeof item.pricingOption === 'number' &&
    typeof item.imagePath === 'string' &&
    (typeof item.price === 'number' || typeof item.price === 'undefined')
  );
}

export async function fetchContents(): Promise<ContentItem[]> {
  try {
    const res = await fetch('https://closet-recruiting-api.azurewebsites.net/api/data');
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error('Malformed API response');
    return data
      .filter(isValidContentApiItem)
      .map((item) => ({
        id: item.id,
        title: item.title,
        userName: item.creator,
        userId: item.creator, // No userId in API, fallback to creator
        imageUrl: item.imagePath,
        price: item.pricingOption === 0 ? item.price : undefined,
        pricingOption: PRICING_OPTION_MAP[item.pricingOption] ?? 'View Only',
      }));
  } catch (error) {
    // Optionally log error to monitoring service
    console.error('Failed to fetch contents:', error);
    return [];
  }
}
