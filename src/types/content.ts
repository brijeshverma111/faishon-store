export type PricingOption = 'Paid' | 'Free' | 'View Only';

export type ContentItem = {
  id: string;
  title: string;
  userName: string;
  userId: string;
  imageUrl: string;
  price?: number;
  pricingOption: PricingOption;
};
