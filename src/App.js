import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
function App() {
  const[search,setSearch] = useState('');
  const [weatherData,setWeatherData] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const[city,setCity] = useState('');

  useEffect(()=>{
    if(city){
      setIsLoading(true);
      axios.get(`https://api.weatherapi.com/v1/current.json`,{
        params:{
          key:"f5478e1c04154b049a0161327231511",
          q:city,
        }
      })
      .then((res)=>setWeatherData(res.data))
      .catch((err)=>{alert("Failed to fetch weather data")})
      .finally(()=> setIsLoading(false));
    }
  },[city])



  return (
    <div className="App">
      <form onSubmit={(e)=> {e.preventDefault();setCity(search)}}>
      <input type='text' value={search} placeholder='Enter city name' onChange={(e)=>setSearch(e.target.value)}/>
      <button>Search</button>
      </form>
      {isLoading && <p>Loading data...</p>}
       {weatherData && !isLoading &&
      <div className='card-wrapper'>
        <div className='card'> 
          <h2>Temperature</h2>
          <p>{`${weatherData.current.temp_c}`}°C </p>
        </div>
        <div className='card'>
          <h2>Humidity</h2>
          <p>{`${weatherData.current.humidity}`}%</p>
        </div>
        <div className='card'>
          <h2>Condition</h2>
          <p>{`${weatherData.current.condition.text}`} </p>
          </div>
        <div className='card'>
        <h2>Wind Speed</h2>
          <p>{`${weatherData.current.wind_kph}`} kph</p>
        </div>
      </div>}
    </div>
  );
}

export default App;
