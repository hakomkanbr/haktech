interface ContentType {
  id?: number,
  categorySlug?: string,
  categoryName: string;
  description?: string,
  title?: string,
  slug?: string,
  price: number,
  discount?: number,
  body?: string;
  comments?: string[],
  rates?: number[],
  rate?: number,
  rateCount?: number;
  custumerRate: number;
  imageNames: string[];
  favorited: boolean;
  quantity: number;
  // biri tek seçılacak..
  mainPhoto: string,
  mainImageName: string,
}

export default ContentType;