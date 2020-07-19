import React, { useEffect } from 'react';

import useToggle from '../hooks/useToggle';

import CubeLoader from '../components/CubeLoader';
import Layout from '../components/Layout';

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
        //DEBUG--> console.log('JSON:', json);
        const sum = {};
        const mres = {};
        json.map((item) => {
          let s = sum[item.nom_ent];
          if (s === undefined) s = 0;
          sum[item.nom_ent] = s + 1;

          let r = mres[item.resultado];
          if (r === undefined) r = 0;
          mres[item.resultado] = r + 1;
        });
        console.log('Estados', sum);
        console.log('Status', mres);
        console.log(`Total de casos: ${json.length}`);
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
      {isLoading && <CubeLoader />}
    </Layout>
  );
};

export default App;
