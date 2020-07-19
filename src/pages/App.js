import React, { useEffect } from 'react';

import useToggle from '../hooks/useToggle';

import CubeLoader from '../components/CubeLoader';
import Layout from '../components/Layout';

require('dotenv').config();

const App = () => {
  const [isLoading, toogleLoading, setIsLoading] = useToggle(false);

  const getData = async (service = '', methodType = 'GET', headerAccept = 'application/json', headerContentType = 'application/json') => {
    try {
      console.log('service--->', service);
      const requestConfig = {
        method: methodType,
        headers: {
          Accept: headerAccept,
          'Content-Type': headerContentType,
        },
      };
      setIsLoading(true);
      const response = await fetch(service, requestConfig);

      if (response.status !== 200) {
        //DEBUG-->
        console.log(`Error code: ${response.status} | Message: ${response.msg}`);
        throw Error(response.msg);
      } else {
        const json = await response.json();
        //DEBUG-->
        console.log('JSON:', json);
        setIsLoading(false);
      }

    } catch (error) {
        setIsLoading(false);
        console.log('Catch:', error);
    }
  };

  useEffect(() => {
    const URL = process.env.API_URL;
    getData(URL);
  }, []);

  return (
    <Layout>
      {isLoading && <CubeLoader />}
    </Layout>
  );
};

export default App;
