import route from 'vue-router';
import axios from 'axios';

class HttpClient {
  constructor() {
    const config = {
      baseURL: process.env.VUE_APP_API_URL,
    };

    this.client = axios.create(config);
    this.client.interceptors.request.use(this.setAccessToken);
  }

  /**
   * アクセストークンをリクエストヘッダーにセット
   * @param {object} config
   * @returns {object}
   */
  setAccessToken = async config => {
    const accessToken = Cookies.get(ACCESS_TOKEN_KEY);
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  };

    /**
   * GETリクエスト
   * @param {string} url
   * @param {object} config
   * @returns {Promise}
   */
  get = async (url, config = {}) => {
    return await this.client.get(url, config);
  };

  /**
   * POSTリクエスト
   * @param {string} url
   * @param {any} data
   * @param {object} config
   * @returns {Promise}
   */
  post = async (url, data = undefined, config = {}) => {
    return await this.client.post(url, data, config);
  };

  /**
   * PUTリクエスト
   * @param {string} url
   * @param {any} data
   * @param {object} config
   * @returns {Promise}
   */
  put = async (url, data = undefined, config = {}) => {
    return await this.client.put(url, data, config);
  };

  /**
   * DELETEリクエスト
   * @param {string} url
   * @param {object} config
   * @returns {Promise}
   */
  delete = async (url, config = {}) => {
    return await this.client.delete(url, config);
  };
}

const httpClientAuth = new HttpClientAuth();

export { httpClientAuth, HttpClientAuth };
