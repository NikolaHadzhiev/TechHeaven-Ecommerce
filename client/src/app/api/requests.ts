import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Router";
import { PaginatedResponse } from "../classes/PaginatedResponseClass";
import { store } from "../store/configureStrore";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true; //Cookie would not be saved to client without this!!
//Simulates slow responses (ONLY FOR DEVELOPMENT PURPOSES)
const simulateSlowResponse = () => new Promise(resolve => setTimeout(resolve, 500))

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
  
  const token = store.getState().account.user?.token;
  if(token) config.headers.Authorization = `Bearer ${token}`;

  return config;
})

axios.interceptors.response.use(
  async (response) => {
    if(process.env.NODE_ENV === 'development') await simulateSlowResponse() //Will remove in production
    const pagination = response.headers['pagination-info'];

    if(pagination) {
      response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
  
      return response;
    }

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
  get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
  post: (url: string, body: {} = {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {} = {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  list: (params: URLSearchParams) => requests.get("products", params),
  details: (id: number) => requests.get(`products/${id}`),
  filters: () => requests.get('products/filters')
};

const ShoppingCart = {
  get: () => requests.get('shoppingCart'),
  addItem: (productId: number, quantity = 1) => requests.post(`shoppingCart?productId=${productId}&quantity=${quantity}`),
  removeItem: (productId: number, quantity = 1) => requests.del(`shoppingCart?productId=${productId}&quantity=${quantity}`)
}

const Account = {
  login: (values: any) => requests.post('account/login', values),
  register: (values: any) => requests.post('account/register', values),
  currentUser: () => requests.get('account/currentUser'),
  savedAddress: () => requests.get('account/savedAddress')
}

const Orders = {
  list: () => requests.get("orders"),
  fetchOrder: (id: number) => requests.get(`orders/${id}`),
  createOrder: (values: any) => requests.post("orders", values)
}

const Payments = {
  createPaymentIntent: () => requests.post('payments', {})
}

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
  ShoppingCart,
  Account,
  Orders,
  Payments
};

export default apiRequests;
