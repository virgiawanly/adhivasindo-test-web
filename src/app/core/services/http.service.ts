import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpConfig } from '../../../types/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  /**
   * The base API URL.
   *
   * @protected
   */
  protected apiUrl: string = environment.api_url;

  /**
   * The default configuration for HTTP requests.
   *
   * @protected
   */
  protected defaultConfig: HttpConfig = {
    withCredentials: true,
  };

  constructor(private httpClient: HttpClient) {}

  /**
   * Retrieves data from the specified URL using a GET request.
   *
   * @param {string} url - The URL to retrieve data from.
   * @param {HttpConfig} config - Request configuration.
   * @return Observable<any> - The response data from the GET request.
   */
  public get(url: string, config: HttpConfig = {}) {
    const requestUrl = this.concatUrl(url);
    return this.httpClient.get(requestUrl, {
      ...this.defaultConfig,
      ...config,
    });
  }

  /**
   * Retrieves generated file.
   *
   * @param {string} url - The URL to retrieve data from.
   * @param {HttpConfig} config - Request configuration.
   * @return Observable<any> - The response data from the GET request.
   */
  public generate(url: string, config: HttpConfig = {}) {
    const requestUrl = this.concatUrl(url);
    return this.httpClient.get(requestUrl, {
      ...this.defaultConfig,
      ...config,
      responseType: 'blob', // This sets the expected response type to Blob
    });
  }

  /**
   * Posts data to the specified URL.
   *
   * @param {string} url - The URL to post the data to.
   * @param {any} body - The data to be posted.
   * @param {HttpConfig} config - Request configuration.
   * @return Observable<any> - A promise that resolves with the response from the server.
   */
  public post(url: string, body: any, config: HttpConfig = {}) {
    const requestUrl = this.concatUrl(url);
    return this.httpClient.post(requestUrl, body, {
      ...this.defaultConfig,
      ...config,
    });
  }

  /**
   * Puts data to the specified URL.
   *
   * @param {string} url - The URL to send the PUT request to.
   * @param {any} body - The data to send in the body of the request.
   * @param {HttpConfig} config - Request configuration.
   * @return Observable<any> A Promise that resolves to the response from the server.
   */
  public put(url: string, body: any, config: HttpConfig = {}) {
    const requestUrl = this.concatUrl(url);
    return this.httpClient.put(requestUrl, body, {
      ...this.defaultConfig,
      ...config,
    });
  }

  /**
   * Patch data to the specified URL.
   *
   * @param {string} url - The URL to send the PATCH request to.
   * @param {any} body - The data to send in the body of the request.
   * @param {HttpConfig} config - Request configuration.
   * @return Observable<any> A Promise that resolves to the response from the server.
   */
  public patch(url: string, body: any, config: HttpConfig = {}) {
    const requestUrl = this.concatUrl(url);
    return this.httpClient.patch(requestUrl, body, {
      ...this.defaultConfig,
      ...config,
    });
  }

  /**
   * Deletes a resource from the specified URL.
   *
   * @param {string} url - The URL of the resource to delete.
   * @param {HttpConfig} config - Request configuration.
   * @returns Observable<any> A promise that resolves with the response from the delete request.
   */
  public delete(url: string, config: HttpConfig = {}) {
    const requestUrl = this.concatUrl(url);
    return this.httpClient.delete(requestUrl, {
      ...this.defaultConfig,
      ...config,
    });
  }

  /**
   * Concatenates the given URL with the base API URL.
   *
   * @param {string} url - The URL to be concatenated.
   * @return string - The concatenated URL.
   */
  private concatUrl(url: string) {
    if (!url) {
      return this.apiUrl;
    }

    return `${this.apiUrl}/${url}`;
  }

  /**
   * Converts the given object to query parameters.
   *
   * @param {any} obj - The object to be converted.
   * @param {string} prefix - The prefix of the object.
   * @return string - The query parameters.
   */
  public buildQueryString(obj: any, prefix?: string): string {
    const pairs = [];

    for (let key in obj) {
      if (!obj.hasOwnProperty(key)) {
        continue;
      }

      const value = obj[key];
      if (value === null || (Array.isArray(value) && value.length === 0)) {
        continue;
      }

      let newKey = prefix ? `${prefix}[${key}]` : key;

      let newValue;
      if (typeof value === 'object') {
        newValue = this.buildQueryString(value, newKey);
      } else {
        newValue = encodeURIComponent(newKey) + '=' + encodeURIComponent(value);
      }

      pairs.push(newValue);
    }

    return pairs.join('&');
  }

  /**
   * Converts the given object to FormData.
   *
   * @param {any} obj - The object to be converted.
   * @param {FormData} form - The FormData object to be appended to.
   * @param {string} namespace - The namespace of the object.
   * @return FormData - The FormData object.
   */
  public convertToFormData(obj: any, form?: FormData, namespace?: string): FormData {
    const fd = form || new FormData();
    let formKey;

    for (let property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (namespace) {
          // For nested objects
          formKey = `${namespace}[${Object.prototype.toString.call(obj) === '[object Array]' ? '' : property}]`;
        } else {
          formKey = property;
        }

        // if the property is an object, but not a File, use recursion.
        if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
          this.convertToFormData(obj[property], fd, property);
        } else {
          // if it's a string or a File object
          fd.append(formKey, obj[property]);
        }
      }
    }

    return fd;
  }
}
