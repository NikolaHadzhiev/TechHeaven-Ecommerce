import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Router";

axios.defaults.baseURL = "http://localhost:5095/api/";

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        toast.error(data.title);

        if (data.errors) {
          const validationErrors: string[] = [];
          for (const key in data.errors) {
            //data.errors[key] -> returns Array

            //[[], [], [], ...]
            validationErrors.push(data.errors[key]);
          }

          //Concats all subarrays and returns one array
          throw validationErrors.flat();
        }

        break;
      case 401:
        toast.error(data.title);
        break;
      case 404:
        toast.error(data.title);
        router.navigate("/not-found");
        break;
      case 500:
        toast.error(data.title);
        router.navigate("/server-error");
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  list: () => requests.get("products"),
  details: (id: number) => requests.get(`products/${id}`),
};

//Testing purposes - may be deleted after development
const TestErrors = {
  get400Error: () => requests.get("error/bad-request"),
  get401Error: () => requests.get("error/unauthorised"),
  get404Error: () => requests.get("error/not-found"),
  get500Error: () => requests.get("error/server-error"),
  getValidationError: () => requests.get("error/validation-error"),
};

const apiRequests = {
  Catalog,
  TestErrors,
};

export default apiRequests;
