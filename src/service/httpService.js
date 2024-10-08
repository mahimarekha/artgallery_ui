import { patch } from '@mui/material';
import axios from 'axios';
import React, { useState } from "react";
console.log(process.env.REACT_APP_NAME)
// https://demo.jeetho.srshta.com/api

const baseURL = process.env.REACT_APP_APIURL?process.env.REACT_APP_APIURL:'http://localhost:8081/v1/';
const instance = axios.create({
  baseURL:baseURL,
  timeout: 500000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token;
  if ( localStorage.getItem("token")) {
    token =   localStorage.getItem("token");
  }
  return {
    ...config,
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

// console.log(process.env.API_BASE_URL);
const responseBody = (response) => response.data;

const requests = {
  get: (url, body) => instance.get(url, body).then(responseBody),

  post: (url, body, headers) =>
    instance.post(url, body, headers).then(responseBody),
  patch: (url, body) => instance.patch(url, body).then(responseBody),
  put: (url, body) => instance.put(url, body).then(responseBody),
  delete: (url, body) => instance.delete(url).then(responseBody),
  baseURL:() => baseURL ,
};

export default requests;
