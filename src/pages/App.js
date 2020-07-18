import React, { useEffect } from 'react';

import useToggle from '../hooks/useToggle';

import CubeLoader from '../components/CubeLoader';
import Layout from '../components/Layout';

const App = () => {
  const [isLoading, toogleLoading, setIsLoading] = useToggle(false);

  const getData = async (service = 'http://localhost:8000/api', methodType = 'GET', headerAccept = 'application/json', headerContentType = 'application/json') => {
    try {
      const requestConfig = {
        method: methodType,
        headers: {
          Accept: headerAccept,
          'Content-Type': headerContentType,
        },
      };

      const response = await fetch(service, requestConfig);

      if (response.status !== 200) {
        //DEBUG-->
        console.log(`Error code: ${response.status} | Message: ${response.msg}`);
        throw Error(response.msg);
      } else {
        const json = await response.json();
        //DEBUG-->
        console.log('JSON:', json);
      }

    } catch (error) {
      console.log('Catch:', error);
    }
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <Layout>
      {isLoading && <CubeLoader />}
    </Layout>
  );
};

export default App;
