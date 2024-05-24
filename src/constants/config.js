export const chartConfig = {
  "1D": { days: 1, weeks: 0, months: 0 },
  "1W": { days: 0, weeks: 1, months: 0 },
  "1M": { days: 0, weeks: 0, months: 1 },
};

export const candleStickOptions = {
  chart: {
    height: 350,
    type: "candlestick",
  },
  title: {
    text: "CandleStick Chart",
    align: "left",
  },
  xaxis: {
    type: "datetime",
  },
  yaxis: {
    labels: {
      formatter: function (value) {
        return value;
      },
    },
    tooltip: {
      enabled: true,
    },
  },
};
