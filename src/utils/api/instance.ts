type BaseUrl = string;
const baseURL: BaseUrl = 'http://localhost:3000/';

class API {
  readonly baseUrl: BaseUrl;

  constructor(baseUrl: BaseUrl) {
    this.baseUrl = baseUrl;
  }

  async request<T>(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(this.baseUrl + endpoint, {
      method: 'GET',
      credentials: 'include',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers && options.headers)
      }
    });
    if (!response.ok) throw new Error(response.statusText);

    const responseData = (await response.json()) as ApiResponse<T>;

    return { data: responseData.data, status: response.status };
  }

  get<T>(endpoint: string, options: Omit<RequestInit, 'body' | 'method'> = {}) {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint: string, body: Record<string, any>, options: Omit<RequestInit, 'method'> = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      ...(!!body && { body: JSON.stringify(body) })
    });
  }
}

export const api = new API(baseURL);
