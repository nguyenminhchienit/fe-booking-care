import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { getAllDateBookingWithMonth } from "../../services/userService";

export default function Chart() {
  const [monthAll, setMonthAll] = useState([]);
  const fetchDateBooking = async () => {
    const res = await getAllDateBookingWithMonth();
    if (res && res.errCode === 0) {
      setMonthAll(res.data);
    }
  };
  useEffect(() => {
    fetchDateBooking();
  }, []);

  const option = {
    xAxis: {
      type: "category",
      data: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
      ],
    },
    yAxis: {
      type: "value",
    },

    series: [
      {
        data: monthAll,
        type: "bar",
      },
    ],
  };
  return <ReactECharts option={option} />;
}
