import axios, { AxiosError } from "axios";

function createAxios(baseURL: string) {
  const instance = axios.create({
    baseURL,
  });
  instance.interceptors.request.use(async (config) => {
    const [accessToken, refreshToken] = [
      localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN!),
      localStorage.getItem(process.env.REACT_APP_REFRESH_TOKEN!),
    ];
    if (!accessToken && config.headers) {
      config.headers.accessToken = "";
      config.headers.refreshToken = "";
    }
    if (config.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers.refreshToken = `Bearer ${refreshToken}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { refreshToken } = error.config.headers;
      if (error.response && error.response.status === 401) {
        try {
          const { status, data } = await axios({
            url: process.env.REACT_APP_REFRESH_URL,
            method: "GET",
            headers: {
              Authorization: refreshToken,
            },
          });
          if (status && data) {
            localStorage.setItem(
              process.env.REACT_APP_ACCESS_TOKEN!,
              data.response.accessToken
            );
            localStorage.setItem(
              process.env.REACT_APP_REFRESH_TOKEN!,
              data.response.refreshToken
            );
            return await instance.request(error.config);
          }
        } catch (e) {
          if (e instanceof AxiosError && e.response) {
            const code = e.response.status;
            if (code === 500) throw new Error("서버 에러!");
          }
        }
      }
      return Promise.reject(error);
    }
  );
  return instance;
}

export enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export const userApiInstance = createAxios(process.env.REACT_APP_USER!);
export const uploadApiInstance = createAxios(
  process.env.REACT_APP_UPLOAD_BASE_URL!
);
