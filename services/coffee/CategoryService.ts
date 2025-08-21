export interface Category {
  categoryId: number;
  categoryName: string;
  description: string;
}

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export class CategoryService {
  async getAll(): Promise<Category[]> {
    if (!API_URL) {
      throw new Error('Missing API URL');
    }

    const res = await fetch(`${API_URL}/Category/getAll`);
    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }

    const json = await res.json();
    return json.data ?? json;
  }
}
