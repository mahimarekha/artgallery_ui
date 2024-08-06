import requests from './httpService';
const CommonService = {

  postRequest(url,body) {
    return requests.post(url,body);
  },
  putRequest(url,body) {
    return requests.put(url,body);
  },
  deleteRequest(url) {
    return requests.delete(url);
  },
  getDetails(url) {
    return requests.get(url);
  }
};

export default CommonService;
