import React, { useContext, useState, useEffect } from "react";
import ChartFilter from "./ChartFilter";
import Card from "./Card";
import ReactApexChart from "react-apexcharts";
import { chartConfig } from "../constants/config";
import StockContext from "../context/StockContext";
import { fetchHistoricalData } from "../api/stock-api";
import { candleStickOptions } from "../constants/config";

const Chart = () => {
  const { stockSymbol } = useContext(StockContext);

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("1W");

  const formatData = (data, filter) => {
    let filterVal = "";
    switch (filter) {
      case "1D":
        filterVal = "Time Series (5min)";
        break;
      case "1W":
        filterVal = "Time Series (Daily)";
      case "1M":
        filterVal = "Weekly Adjusted Time Series";
      default:
        filterVal = "Time Series (Daily)";
        break;
    }

    const formattedData = [];
    if (data[filterVal]) {
      Object.entries(data[filterVal]).map(([key, value]) => {
        formattedData.push({
          x: key,
          y: [
            value["1. open"],
            value["2. high"],
            value["3. low"],
            value["4. close"],
          ],
        });
      });
    }
    return formattedData;
  };

  useEffect(() => {
    const updateChartData = async () => {
      try {
        const result = await fetchHistoricalData(stockSymbol, filter);
        console.log(result);
        setData(formatData(result, filter));
      } catch (error) {
        setData([]);
        console.log(error);
      }
    };

    updateChartData();
  }, [stockSymbol, filter]);

  return (
    <Card>
      <ul className="flex absolute top-2 right-2 z-40">
        {Object.keys(chartConfig).map((item) => {
          return (
            <li key={item}>
              <ChartFilter
                text={item}
                active={filter === item}
                onClick={() => {
                  setFilter(item);
                }}
              />
            </li>
          );
        })}
      </ul>
      <ReactApexChart
        series={[{ data: data }]}
        options={candleStickOptions}
        type="candlestick"
      />
    </Card>
  );
};

export default Chart;
