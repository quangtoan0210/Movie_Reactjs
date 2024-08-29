import { useState, useEffect } from 'react'
import Banner from './components/Banner'
import Header from './components/Header'
import MovieList from './components/MovieList'
import Footer from './components/Footer';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
function App() {
  const [movie, setMovie] = useState([]);
  const [movieRate, setMovieRate] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };
      const url1 = 'https://api.themoviedb.org/3/movie/popular?language=vi-US&page=1';
      const url2 = 'https://api.themoviedb.org/3/tv/top_rated?language=vi-US&page=1';
      const [res1, res2] = await Promise.all([
        fetch(url1, options),
        fetch(url2, options),

      ])
      const data1 = await res1.json();
      const data2 = await res2.json();
      setMovie(data1.results);
      setMovieRate(data2.results);

    }
    fetchMovie();
  }, []);

  return (
    <>
      
        <Header />
        <Banner />
        <div className='bg-black p-10'>
        <MovieList title={'Phim Hot'} data={movie} />
        <MovieList title={'Phim Đề cử'} data={movieRate} />
      </div>
      <Footer/>
    </>
  )
}

export default App
