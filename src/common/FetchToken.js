import axios from "axios";

function FetchToken(token) {
    const fetchBit = async () => {
        return await axios.get(
            `https://api.coingecko.com/api/v3/coins/${token}`
        );
    };
    return fetchBit();
}

export default FetchToken;
