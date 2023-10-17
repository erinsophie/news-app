import {
  Link,
  useSearchParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { formatDate } from '../utils/utils';
import MobileMenu from '../components/MobileMenu';

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
  // mobile menu
  const [isOpen, setIsOpen] = useState(false);
  // api key
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

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
  function handleSearch(e) {
    e.preventDefault();
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
              `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`,
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

  return (
    <header className="relative bg-[#FFCE36] text-sm flex flex-col gap-3 p-4 mb-10">
      <div className="flex justify-between">
        <h1 className="md:text-2xl">
          News<span className="font-bold">Daily</span>
        </h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          weatherData && (
            <div className="text-end flex gap-2 md:flex-col">
              <p className="text-base md:text-xl">
                {weatherData.current.temp_c}°C
              </p>
              <div className="hidden md:block flex flex-col text-sm md:text-base">
                <p>{weatherData.location.name}</p>
                <p>{formatDate(weatherData.location.localtime)}</p>
              </div>
              <button
                className="block md:hidden"
                aria-label={`${
                  isOpen ? 'close menu button' : 'open menu button'
                }`}
                onClick={() => setIsOpen(!isOpen)}
              >
                <i
                  className={`fa-solid fa-${isOpen ? 'times' : 'bars'} text-lg`}
                ></i>
              </button>
            </div>
          )
        )}
      </div>

      {isOpen && <MobileMenu selectedTab={selectedTab} />}

      <div className="flex justify-between">
        <div className="hidden md:flex md:gap-3 lg:gap-10">
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

        <form className="flex gap-2 items-center" onSubmit={handleSearch}>
          <label htmlFor="searchInput" className="sr-only">
            Search
          </label>
          <input
            type="search"
            id="searchInput"
            value={searchParams.get('query') || ''}
            onChange={(e) => setSearchParams({ query: e.target.value })}
            placeholder="Search..."
            className="p-1 rounded-lg"
          ></input>

          <button aria-label="search button">
            <i className="fa-solid fa-magnifying-glass text-base cursor-pointer"></i>
          </button>
        </form>
      </div>
    </header>
  );
}

export default Header;
