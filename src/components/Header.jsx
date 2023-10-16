import {
  Link,
  useSearchParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { formatDate } from '../utils/utils';

function Header() {
  // weather data
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // search params
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState('news');
  const location = useLocation();
  const navigate = useNavigate();

  // for visual indication
  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setSelectedTab('news');
        break;
      case '/technology':
        setSelectedTab('technology');
        break;
      case '/science':
        setSelectedTab('science');
        break;
      case '/business':
        setSelectedTab('business');
        break;
      case '/sports':
        setSelectedTab('sports');
        break;
      default:
        setSelectedTab('news');
        break;
    }
  }, [location.pathname]);

  // naviagte to search page when clicked and not empty
  function handleSearch() {
    const query = searchParams.get('query');
    if (query && query.trim() !== '') {
      navigate(`/search?query=${query}`);
    }
  }

  // fetch users current weather data
  useEffect(() => {
    function fetchWeather() {
      if ('geolocation' in navigator) {
        try {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const response = await fetch(
              `https://api.weatherapi.com/v1/current.json?key=8496bc66c37e43b1a0f180756231805&q=${latitude},${longitude}`,
            );

            const data = await response.json();
            setWeatherData(data);
            setError(null);
          });
        } catch (error) {
          setError(error.message);
          setWeatherData(null);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchWeather();
  }, []);

  if (error) return <p>{`Error: ${error}`}</p>;
  console.log('weather:', weatherData);

  return (
    <header className="bg-[#FFCE36] text-sm flex flex-col gap-3 p-4 mb-10">
      <div className="flex justify-between">
        <h1 className="md:text-2xl">
          News<span className="font-bold">Daily</span>
        </h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          weatherData && (
            <div className='text-end'>
              <p className='text-base md:text-xl'>{weatherData.current.temp_c}°C</p>
              <div className="flex flex-col text-sm md:text-base">
                <p>{weatherData.location.name}</p>
                <p>{formatDate(weatherData.location.localtime)}</p>
              </div>
            </div>
          )
        )}
      </div>

      <div className="flex flex-col justify-between md:flex-row">
        <div className="flex gap-6 lg:gap-10">
          <Link to="/" className={selectedTab === 'news' ? 'underline' : ''}>
            News
          </Link>
          <Link
            to="/technology"
            className={selectedTab === 'technology' ? 'underline' : ''}
          >
            Technology
          </Link>
          <Link
            to="/science"
            className={selectedTab === 'science' ? 'underline' : ''}
          >
            Science
          </Link>
          <Link
            to="/business"
            className={selectedTab === 'business' ? 'underline' : ''}
          >
            Business
          </Link>
          <Link
            to="/sports"
            className={selectedTab === 'sports' ? 'underline' : ''}
          >
            Sports
          </Link>
        </div>

        <form className="flex gap-2 items-center">
          <input
            type="search"
            value={searchParams.get('query') || ''}
            onChange={(e) => setSearchParams({ query: e.target.value })}
            placeholder="Search..."
            className="p-1 rounded-lg"
          ></input>

          <i
            onClick={handleSearch}
            className="fa-solid fa-magnifying-glass text-base cursor-pointer"
          ></i>
        </form>
      </div>
    </header>
  );
}

export default Header;
