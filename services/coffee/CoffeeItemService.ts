export interface CoffeeItem {
  coffeeId: number;
  categoryId: number;
  coffeeName: string;
  description: string;
  code: string;
  isActive: boolean;
  imageUrl?: string;
}

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export class CoffeeItemService {
  async getAll(): Promise<CoffeeItem[]> {
    if (!API_URL) {
      throw new Error('Missing API URL');
    }

    const res = await fetch(`${API_URL}/CoffeeItem`);
    if (!res.ok) {
      throw new Error('Failed to fetch coffee items');
    }

    const json = await res.json();
    return json.data ?? json;
  }

  async search(keyword: string): Promise<CoffeeItem[]> {
    if (!API_URL) {
      throw new Error('Missing API URL');
    }

    const res = await fetch(`${API_URL}/CoffeeItem/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchCondition: { keyword, isDelete: false },
        pageInfo: { pageNum: 1, pageSize: 10 },
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to search coffee items');
    }

    const json = await res.json();
    return json.data?.pageData ?? json;
  }

  async get(id: number): Promise<CoffeeItem> {
    if (!API_URL) {
      throw new Error('Missing API URL');
    }

    const res = await fetch(`${API_URL}/CoffeeItem/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch coffee item');
    }

    const json = await res.json();
    return json.data ?? json;
  }

  async generateQrCode(
    userId: number,
    coffeeId: number,
    token: string,
  ): Promise<{ subscriptionId: number; coffeeCode: string; userId: number }> {
    if (!API_URL) {
      throw new Error('Missing API URL');
    }
    const res = await fetch(
      `${API_URL}/CoffeeItem/qrcode?userId=${userId}&coffeeId=${coffeeId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      const message = await res.text();
      throw new Error(
        `Failed to generate QR code: ${res.status} ${message} (userId: ${userId}, coffeeId: ${coffeeId})`,
      );
    }

    const json = await res.json();
    return json.data ?? json;
  }
}
