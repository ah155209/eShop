type CacheKey = string;

export class LruCache<V> {
  private capacity: number;
  private map: Map<CacheKey, V>;

  constructor(capacity: number = 50) {
    this.capacity = capacity;
    this.map = new Map();
  }

  get(key: CacheKey): V | undefined {
    if (!this.map.has(key)) return undefined;
    const value = this.map.get(key) as V;
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }

  set(key: CacheKey, value: V): void {
    if (this.map.has(key)) {
      this.map.delete(key);
    } else if (this.map.size >= this.capacity) {
      const oldestKey = this.map.keys().next().value as CacheKey;
      this.map.delete(oldestKey);
    }
    this.map.set(key, value);
  }
}

export const globalSearchCache = new LruCache<any>(50);

