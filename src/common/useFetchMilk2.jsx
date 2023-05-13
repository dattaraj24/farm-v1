import { useState, useEffect } from "react";
import axios from "axios";


function useFetchMilk() {
  const [milk, setMilk] = useState([]);

  useEffect(() => {
    fetchMilk();
  }, []);

  const fetchMilk = async () => {
    try {
      let { data } = await axios.get(
        "https://api.coingecko.com/api/v3/coins/ethereum"
      );
      setMilk(data);
    } catch (error) {
      console.log(error); 
    }
  };
  return milk;
}

export default useFetchMilk;

