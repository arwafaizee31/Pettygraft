import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
export default function LineChartDashboard() {
    return (
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
        
           
            { curve: "monotoneX", data: [0, 5, 2, 6, 3, 9.3],
            color: '#f88080' },
    { curve: "monotoneX", data: [6, 3, 7, 9.5, 4, 2] },

        ]}
        height={300}
        margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
        grid={{ vertical: true, horizontal: true }}
      />
    );
  }
  