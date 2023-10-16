import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState('news');
  const location = useLocation();

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

  return (
    <header className="text-sm flex flex-col gap-3 p-2 border-b border-gray-300 mb-10">
      <h1 className="md:text-2xl">NewsDaily</h1>

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
            className="p-1 rounded-lg"
          ></input>
          <Link to={`/search?query=${searchParams.get('query')}`}>Search</Link>
        </form>
      </div>
    </header>
  );
}

export default Header;