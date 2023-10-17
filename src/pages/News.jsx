import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MiniArticle from '../components/MiniArticle';
import MediumArticle from '../components/MediumArticle';
import TextArticle from '../components/TextArticle';

function News() {
  // category
  const { category } = useParams();
  // state
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // api key
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch(
          `https://api.currentsapi.services/v1/latest-news?category=${
            category || 'world'
          }&apiKey=${API_KEY}`,
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
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [category]);

  if (error) return <p>{`Error: ${error}`}</p>;
  if (loading) return <p>Loading...</p>;

  // top article
  const topArticle = articles[0];

  return (
    <main className="flex-1 flex flex-col gap-10">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-3">
              <div className="flex-1 w-full max-h-[400px] h-[100px] w-[300px] md:max-w-[620px] md:min-w-[620px] overflow-hidden relative rounded-lg">
                <img
                  src={topArticle.image}
                  alt='top article image'
                  className="object-cover w-full h-full"
                ></img>
                <a
                  href={topArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline absolute bottom-0 left-0 bg-gray-300 bg-opacity-80 w-full p-2"
                >
                  {topArticle.title}
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <MiniArticle article={articles[1]} />
              <MiniArticle article={articles[2]} />
              <MiniArticle article={articles[3]} />
            </div>
          </div>

          <div className="bg-white rounded-lg flex flex-col gap-5 p-10 lg:flex-row">
            <div className="flex flex-col gap-8">
              <h2 className="text-xl">Top stories</h2>
              <TextArticle article={articles[4]} />
              <TextArticle article={articles[5]} />
              <TextArticle article={articles[6]} />
            </div>
            <div className="flex flex-col gap-10 lg:flex-row">
              <MediumArticle article={articles[7]} />
              <MediumArticle article={articles[8]} />
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default News;
