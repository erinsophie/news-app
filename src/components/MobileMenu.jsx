import { Link } from 'react-router-dom';

function MobileMenu({ selectedTab }) {
  return (
    <div className="absolute z-[1] top-24 left-0 w-full bg-white flex items-center p-5 flex-col gap-6">
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
  );
}

export default MobileMenu;
