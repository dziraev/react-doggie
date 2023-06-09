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
    if (responseData.success) {
      return { data: responseData.data, status: response.status, success: responseData.success };
    }
    return { data: responseData.data, status: response.status, success: responseData.success };
  }

  get<T>(endpoint: string, options: Omit<RequestInit, 'body' | 'method'> = {}) {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T>(endpoint: string, body: Record<string, any>, options: Omit<RequestInit, 'method'> = {}) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      ...(!!body && { body: JSON.stringify(body) })
    });
  }
}

export const api = new API(baseURL);
