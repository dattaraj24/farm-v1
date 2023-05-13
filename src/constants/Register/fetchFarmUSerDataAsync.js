import {
  fetchFarmUserAllowances,
  fetchFarmUserEarnings,
  fetchFarmUserTokenBalances,
  fetchFarmUserStakedBalances,
} from "./fetchFarmUser";

const fetchFarmUSerDataAsync = (account) => {
  let data = "";

  const fetchFarmdata = async () => {
    const userFarmAllowances = await fetchFarmUserAllowances(account);
    const userFarmTokenBalances = await fetchFarmUserTokenBalances(account);
    const userStakedBalances = await fetchFarmUserStakedBalances(account);
    const userFarmEarnings = await fetchFarmUserEarnings(account);

    const arrayOfUserDataObjects = userFarmAllowances.map(
      (farmAllowance, index) => {
        return {
          index,
          allowance: userFarmAllowances[index],
          tokenBalance: userFarmTokenBalances[index],
          stakedBalance: userStakedBalances[index],
          earnings: userFarmEarnings[index],
        };
      }
    );
    return arrayOfUserDataObjects
  };
  return fetchFarmdata();
};

export default fetchFarmUSerDataAsync;
