const basePath = "https://finnhub.io/api/v1";
const candlePath = "https://www.alphavantage.co";

export const searchSymbol = async (query) => {
  const url = `${basePath}/search?q=${query}&token=${process.env.REACT_APP_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

export const fetchStockDetails = async (stockSymbol) => {
  const url = `${basePath}/stock/profile2?symbol=${stockSymbol}&token=${process.env.REACT_APP_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

export const fetchQuote = async (stockSymbol) => {
  const url = `${basePath}/quote?symbol=${stockSymbol}&token=${process.env.REACT_APP_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

export const fetchHistoricalData = async (stockSymbol, filter) => {
  let filterVal = "";
  switch (filter) {
    case "1D":
      filterVal = "TIME_SERIES_INTRADAY";
      break;
    case "1W":
      filterVal = "TIME_SERIES_DAILY_ADJUSTED";
      break;
    case "1M":
      filterVal = "TIME_SERIES_WEEKLY_ADJUSTED";
      break;
    default:
      filterVal = "TIME_SERIES_DAILY_ADJUSTED";
      break;
  }

  const url = `${candlePath}/query?function=${filterVal}&symbol=${stockSymbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};
