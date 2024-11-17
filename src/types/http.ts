import { HttpContext } from '@angular/common/http';

export interface HttpFormattedErrorResponse {
  error: boolean;
  message: string;
  status?: string | number;
  errors?: any[];
}

export interface HttpConfig {
  headers?: any;
  context?: HttpContext;
  observe?: 'body';
  params?: any;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}
