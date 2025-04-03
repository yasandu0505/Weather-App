# Weather App ⛅️ ☀️ 🌧️ 🌪️ 🌈 ❄️

This Weather App is a React-based application that fetches real-time weather data from a third-party API. It provides users with accurate weather updates in a simple and intuitive interface.

## Features

- Real-time weather updates
- Search for current weather by city name
- Responsive design using Bootstrap
- Displays temperature, weather conditions, and more

## Tech Stack

- **Frontend:** React, Bootstrap, CSS
- **API:** Third-party weather API (e.g., OpenWeatherMap)

## Installation and Setup

Follow these steps to run the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yasandu0505/Weather-App.git
   cd Weather-App
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create an ************************`.env`************************ file** in the project root and add your API key:

   ```env
   REACT_APP_WEATHER_API_KEY=your_api_key_here
   ```

4. **Start the React app:**

   ```bash
   npm start
   ```

5. Open `http://localhost:3000` in your browser.

## Project Structure

```
Weather-App/
│── public/          # Static assets
│── src/
│   ├── components/  # Reusable components
│   ├── pages/       # Page components
│   ├── services/    # API service files
│   ├── App.js       # Main App component
│   ├── index.js     # Entry point
│── .env             # Environment variables (API key)
│── package.json     # Project dependencies
│── README.md        # Project documentation
```

## API Integration

This project requires an API key from a weather service (e.g., OpenWeatherMap). Ensure you replace `your_api_key_here` in the `.env` file with your actual API key.

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

