import Trailer from '../../components/trailer/Trailer';
import MovieList from '../../components/movielist/MovieList';
import TvShowList from '../../components/tvshowlist/TvShowList';
import TrendingList from '../../components/trendinglist/TrendingList';


const Home = () => {

  return (
    <div className='flex flex-col gap-4 p-4 bg-black'>
      <Trailer />
      <MovieList />
      <TvShowList />
      <TrendingList />
    </div>
  )
}

export default Home