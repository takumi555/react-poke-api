import axios, { AxiosResponse } from 'axios';

export default class ApiClient {
  baseUrl: string = "https://pokeapi.co/api/v2"

  constructor() {}

  async get<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.get(`${this.baseUrl}${endpoint}`, { params });
      return response.data;
    } catch (error) {
      this.handleRequestError(error);
    }
  }

  async post<T>(endpoint: string, data: Record<string, any> = {}): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.post(`${this.baseUrl}${endpoint}`, data);
      return response.data;
    } catch (error) {
      this.handleRequestError(error);
    }
  }

  private handleRequestError(error: AxiosError): void {
    console.error(`Error during ${error.config.method?.toUpperCase()} request to ${error.config.url}:`, error.message);
    throw error;
  }
}
