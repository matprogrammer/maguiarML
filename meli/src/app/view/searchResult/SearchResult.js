import React, { useEffect, useState } from 'react';
import connect from './connect';

import TopSearch from '../../components/topSearch';
import ResultItem from '../../components/resultItem';
import Shimmer from '../../components/shimmer';
import Breadcrumb from '../../components/breadcrumb';
import NoResults from '../../components/noResults';

function SearchResult({ getProducts, productsLoading }) {
  const [results, setResults] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const result = await getProducts();
      if (result) {
        setResults(result);
        setLoading(productsLoading);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="body-container">
        <TopSearch />
        { results?.categories && <Breadcrumb categories={results?.categories} />}
        <div className="items-container">
          {
            !isLoading ? (
              results?.items?.length > 0 ?
              results?.items?.map(i => (
                  <ResultItem key={i.id} item={i} />
                )) :
                <NoResults />
            ) : <Shimmer/>
          }
        </div>
    </div>
  );
}

export default connect(SearchResult);
