 import CategoryFilter from './CategoryFilter.jsx';
import Movies from './Movies.jsx';
import Pagination from './Pagination.jsx';
import Search from './Search.jsx';

function Home() {


  return (
    <>
    <Search/>
    <CategoryFilter/>
    <Movies/>
    <Pagination/>
    </>
  )
}

export default Home   