import React, { createContext, useState, useContext, useEffect } from 'react';

import Loading from '~/components/Loading';
import api from '~/services/api';

const LoadingContext = createContext({});

export const LoadingProvider = ({ children }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    api.interceptors.request.use(
      (req) => {
        setShow(true);
        return req;
      },
      (error) => {
        setShow(false);
        return Promise.reject(error);
      }
    );
    api.interceptors.response.use(
      (res) => {
        setTimeout(() => {
          setShow(false);
        }, 200);
        return res;
      },
      (error) => {
        setShow(false);
        return Promise.reject(error);
      }
    );
  }, []);

  /**
   * handle loading
   * @param {boolean} loading
   */
  const handleLoading = (loading) => {
    setShow(loading);
  };

  return (
    <LoadingContext.Provider value={{ showing: show, handleLoading }}>
      {show && <Loading />}
      {children}
    </LoadingContext.Provider>
  );
};

export default function useLoading() {
  return useContext(LoadingContext);
}
