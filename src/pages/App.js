import React, { useState, useEffect } from 'react';

import useToggle from '../hooks/useToggle';

import CubeLoader from '../components/CubeLoader';
import Layout from '../components/Layout';
import MapContainer from '../components/MapContainer';

const App = () => {
  const [data, setData] = useState([]);
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
        //DEBUG--> console.log('JSON:', json);
        setData(json);
        setIsLoading(false);
      }

    } catch (error) {
      setIsLoading(false);
      console.log('Catch:', error);
    }
  };

  useEffect(() => {
    getData('/api');
  }, []);

  return (
    <Layout>
      {
        data.length > 0 &&
        <MapContainer data={data} />
      }
      {isLoading && <CubeLoader />}
    </Layout>
  );
};

export default App;
