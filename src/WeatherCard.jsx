import { Typography, Input, Paper, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import WaterOutlinedIcon from "@mui/icons-material/WaterOutlined";

//API Key 3120aa87cedf9e5a9af6a2257e2ebae2

//weather call https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

//geocoding call http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
const APIkey = "3120aa87cedf9e5a9af6a2257e2ebae2";

const WeatherCard = () => {
  const [weather, setWeather] = useState("");
  const [userInput, setUserInput] = useState();
  const [image, setImage] = useState("");

  const handleSearch = async () => {
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&appid=${APIkey}`
    );
    const geoResponseData = await geoResponse.json();
    setUserInput("");
    //check if weather failed
    if (!geoResponseData[0]) {
      setImage("404.png");
      setWeather("error");
    } else {
      const lat = geoResponseData[0].lat;
      const lon = geoResponseData[0].lon;
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`
      );
      const finalData = await weatherResponse.json();
      setWeather(finalData);

      console.log(finalData);
      switch (finalData.weather[0].main) {
        case "Clear":
          setImage("clear.png");
          break;
        case "Clouds":
          setImage("cloud.png");
          break;
        case "Misty":
          setImage("mist.png");
          break;
        case "Rainy":
          setImage("rain.png");
          break;
        case "Drizzle":
          setImage("rain.png");
          break;
        case "Snowy":
          setImage("snow.png");
          break;
        default:
          console.log(`error in switch statement ${finalData.weather[0].main}`);
      }
    }
  };

  return (
    <Box
      borderRadius="1.5rem"
      width="450px"
      backgroundColor="#fff"
      padding="2rem"
    >
      {/* HEADER */}
      <Box display="flex" justifyContent="center" pb="2rem">
        <Typography variant="h4" fontWeight="bold"  >
          Jens Weather-App
        </Typography>
      </Box>

      {/* SEARCHBAR */}
      <Box display="flex" justifyContent="space-between">
        <Input
          placeholder="Search for a place..."
          fullWidth
          autoFocus
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <Box pl="0.5rem">
          <IconButton onClick={handleSearch}>
            <SearchOutlinedIcon color="primary" />
          </IconButton>
        </Box>
      </Box>

      {weather !== "" ? (
        weather === "error" ? (
          //display 404
          <>
            <Box display="flex" justifyContent="center">
              <img alt={image} src="images/404.png" />
            </Box>
            <Box display="flex" justifyContent="center">
              <Typography variant="h6" fontWeight="light">
                Oops invalid location :/
              </Typography>
            </Box>
          </>
        ) : (
          //display weather info
          <>
            <Box>
              {/* IMAGE */}

              <Box display="flex" justifyContent="center" p="1.5rem 0">
                <img alt={image} src={`images${image}`} />
              </Box>

              {/* TEMP */}
              <Box display="flex" justifyContent="center">
                <Typography variant="h2" fontWeight="bold">{`${Math.round(
                  weather.main.temp
                )}°C`}</Typography>
              </Box>

              {/* KIND OF WEATHER */}
              <Box display="flex" justifyContent="center">
                <Typography variant="h6" fontWeight="light">
                  {weather.weather[0].main}
                </Typography>
              </Box>

              {/* FOOTER */}
              <Box display="flex" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                  <WaterOutlinedIcon fontSize="large" />
                  <Box display="grid" pl="0.5rem">
                    <Typography fontWeight="bold" variant="h6">
                      {`${weather.main.humidity}%`}
                    </Typography>
                    <Typography fontWeight="light">Humdity</Typography>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center">
                  <AirOutlinedIcon fontSize="large" />
                  <Box display="grid" pl="0.5rem">
                    <Typography fontWeight="bold" variant="h6">
                      {`${Math.round(weather.wind.speed)}m/s`}
                    </Typography>
                    <Typography fontWeight="light">Wind Speed</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </>
        )
      ) : (
        //display none
        <></>
      )}
    </Box>
  );
};

export default WeatherCard;
