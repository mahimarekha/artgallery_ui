import requests from './httpService';
const CommonService = {

  postRequest(url,body) {
    return requests.post(url,body);
  },
  putRequest(url,body) {
    return requests.put(url,body);
  },
  patchRequest(url,body) {
    return requests.patch(url,body);
  },
  deleteRequest(url) {
    return requests.delete(url);
  },
  getDetails(url) {
    return requests.get(url);
  },
  fileUpload(url,requestData) {
    return requests.post(url, requestData, {
        'Content-Type': 'multipart/form-data',
      });
  },
};

export default CommonService;
