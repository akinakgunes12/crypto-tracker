import { LineChart, Line, XAxis, YAxis } from 'recharts';
import { useTheme } from '@material-ui/styles';

const CoinTableCharts = ({ coin, width }) => {
  const theme = useTheme();
  const sparkData = coin.sparkline_in_7d.price;

  const data = sparkData.map((price) => {
    return {
      price: price,
    };
  });

  return (
    <LineChart width={width || 220} height={60} data={data}>
      <XAxis hide={true} dataKey="price" />
      <YAxis hide={true} domain={['auto', 'auto']} />
      <Line
        type="monotone"
        dot={false}
        dataKey="price"
        stroke={theme.palette.secondary.main}
        strokeWidth={2}
      />
    </LineChart>
  );
};

export default CoinTableCharts;
