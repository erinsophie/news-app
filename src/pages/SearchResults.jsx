import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MiniArticle from '../components/MiniArticle';

function SearchResults() {
  // search term
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('query');
  console.log('search term', searchTerm);

  // state
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // api key
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch(
          `https://api.currentsapi.services/v1/search?keywords=${searchTerm}&language=en&apiKey=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();

        // only include articles that have an image
        const filteredArticles = data.news.filter(
          (article) => article.image !== 'None',
        );

        setArticles(filteredArticles);
        setError(null);
      } catch (error) {
        setError(error.message);
        setArticles(null);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [searchTerm]);

  if (error) return <p>{`Error: ${error}`}</p>;

  return (
    <div className="flex-1">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 className="pt-6 pb-6 text-base md:text-xl">
            Latest articles containing the keyword{' '}
            <span className="font-bold">{`'${searchTerm}'`}</span>
          </h2>

          <div className="flex flex-col gap-6">
            {articles.map((article) => (
              <MiniArticle key={article.id} article={article} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SearchResults;
