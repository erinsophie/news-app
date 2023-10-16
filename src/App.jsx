import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-3 md:pl-20 md:pr-20 md:p-10">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
