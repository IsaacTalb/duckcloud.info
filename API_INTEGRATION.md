# API Integration Examples

This file contains examples for integrating backend APIs into the Duck Cloud website.

## 📡 Basic API Service

Create `src/services/api.ts`:

```typescript
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.duckcloud.info';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  // Products
  getProducts: () => apiClient.get('/products'),
  getProduct: (id: string) => apiClient.get(`/products/${id}`),
  
  // Tools
  getTools: () => apiClient.get('/tools'),
  getTool: (id: string) => apiClient.get(`/tools/${id}`),
  
  // Blog
  getBlogPosts: () => apiClient.get('/blog'),
  getBlogPost: (slug: string) => apiClient.get(`/blog/${slug}`),
  
  // Analytics
  getAnalytics: (productId: string) => apiClient.get(`/analytics/${productId}`),
  
  // Newsletter
  subscribeNewsletter: (email: string) =>
    apiClient.post('/newsletter/subscribe', { email }),
};

export default apiClient;
```

## 🪝 Custom Hooks

Create `src/hooks/useApi.ts`:

```typescript
import { useState, useEffect } from 'react';
import { api } from '@/services/api';

export const useApi = <T,>(
  apiCall: () => Promise<{ data: T }>
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiCall();
        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
```

## 📊 Fetch Products from API

Update `src/components/sections/Products.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '@/services/api';
import type { Product } from '@/types';

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading products...</div>;
  }

  // ... rest of component
};
```

## 💌 Newsletter Subscription

Create `src/components/Newsletter.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { api } from '@/services/api';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      await api.subscribeNewsletter(email);
      setMessage('✅ Successfully subscribed!');
      setEmail('');
    } catch (error) {
      setMessage('❌ Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
      />
      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? 'Subscribing...' : 'Subscribe'}
      </button>
      {message && <div className="text-sm">{message}</div>}
    </form>
  );
};
```

## 📈 Analytics Data Fetching

Create `src/hooks/useAnalytics.ts`:

```typescript
import { useApi } from './useApi';
import { api } from '@/services/api';

export const useAnalytics = (productId: string) => {
  return useApi(() => api.getAnalytics(productId));
};
```

Usage in component:

```typescript
'use client';

import { useAnalytics } from '@/hooks/useAnalytics';

export const ProductAnalytics = ({ productId }: { productId: string }) => {
  const { data, loading, error } = useAnalytics(productId);

  if (loading) return <div>Loading analytics...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data && (
        <>
          <h3>Analytics for {data.productName}</h3>
          <p>Users: {data.userCount}</p>
          <p>Engagement: {data.engagementRate}%</p>
        </>
      )}
    </div>
  );
};
```

## 🔐 Authentication

Create `src/hooks/useAuth.ts`:

```typescript
import { useState, useCallback } from 'react';
import apiClient from '@/services/api';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      localStorage.setItem('authToken', response.data.token);
      setUser(response.data.user);
      setIsAuthenticated(true);
      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const signup = useCallback(async (email: string, password: string, name: string) => {
    try {
      const response = await apiClient.post('/auth/signup', { email, password, name });
      localStorage.setItem('authToken', response.data.token);
      setUser(response.data.user);
      setIsAuthenticated(true);
      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  return { isAuthenticated, user, login, logout, signup };
};
```

## 🛒 Shopping Cart (Optional)

Create `src/hooks/useCart.ts`:

```typescript
import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  total: 0,

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      const items = existing
        ? state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          )
        : [...state.items, item];
      return {
        items,
        total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      };
    }),

  removeItem: (id) =>
    set((state) => {
      const items = state.items.filter((i) => i.id !== id);
      return {
        items,
        total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      };
    }),

  updateQuantity: (id, quantity) =>
    set((state) => {
      const items = state.items.map((i) => (i.id === id ? { ...i, quantity } : i));
      return {
        items: items.filter((i) => i.quantity > 0),
        total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      };
    }),

  clearCart: () => set({ items: [], total: 0 }),
}));
```

## 🔔 Error Handling

Create `src/services/errorHandler.ts`:

```typescript
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
  }
}

export const handleApiError = (error: any): never => {
  if (error.response) {
    throw new ApiError(
      error.response.status,
      error.response.data?.message || 'An error occurred',
      error.response.data
    );
  } else if (error.request) {
    throw new ApiError(0, 'No response from server');
  } else {
    throw error;
  }
};
```

## 📝 Type Definitions for API

Add to `src/types/index.ts`:

```typescript
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  statusCode: number;
  message: string;
  details?: unknown;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
```

## 🧪 Example API Configuration

For a real API, update `src/services/api.ts`:

```typescript
// For production
const API_BASE_URL = 
  process.env.NODE_ENV === 'production'
    ? 'https://api.duckcloud.info'
    : 'http://localhost:5000';

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('authToken');
      // Redirect to login
    }
    return Promise.reject(error);
  }
);
```

## 🚀 Usage Examples

```typescript
// In a component
'use client';

import { useEffect, useState } from 'react';
import { api } from '@/services/api';

export const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.getProducts()
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return <div>{/* Render data */}</div>;
};
```

---

**These examples show how to integrate your Duck Cloud API with the frontend.**

For more details, refer to your backend API documentation.
