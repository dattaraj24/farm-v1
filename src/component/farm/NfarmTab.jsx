/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from "react";
import Switch from "react-switch";
import FarmCard from "./FarmCard";
import InFarmCard from "./InFarmCrad";
import Spinner from "react-bootstrap/Spinner";
import fetchFarms from "../../constants/multiCaller";
import FarmRegister from "./FarmRegister";
import { ContextOneApp, ContextTwoApp, ContextLp } from "../../App";
import { MainTvlFetcher } from "../../TVLFetch/MainTvlFetcher";
import fetchFarmUSerDataAsync from "../../constants/Register/fetchFarmUSerDataAsync";
import {
  calculateCakeEarnedPerThousandDollars,
  apyModalRoi,
} from "./compoundApy";
import CoinGecko from "coingecko-api";
import BigNumber from "bignumber.js";

const FarmTab = () => {
  const [active, setActive] = useState(true);
  const [checked, setChecked] = useState(true);
  const [lpTokens, setLptoken] = React.useState();
  const [aprV, setAprV] = React.useState({});
  const [userlpTokens, setUserLptoken] = React.useState();
  const [totliquidity, setTotliquidity] = React.useState();
  const [isregistered2, setIsregistered] = React.useState(false);

  const access = useContext(ContextOneApp);
  const access2 = useContext(ContextTwoApp);
  const access3 = useContext(ContextLp);
  let wei = 1000000000000000000;

  const { userAccount, objOne, objTwo } = access;
  const { lpTokens2, totliquidity2,isregistered } = access3;

  // console.log(objTwo,"objTwo")

  const dataFunc = async () => {
    const a = await fetchFarms();
    setLptoken(a);
    const value = await MainTvlFetcher();
    setTotliquidity(value[1]);
  };

  const userLpData = async (userAccount) => {
    const lp = await fetchFarmUSerDataAsync(userAccount);
    setUserLptoken(lp);
  };

  const apr = async (lpTokens) => {
    // const cakePrice = await useFetch();
    const CoinGeckoClient = new CoinGecko();
    // ethPrice
    const ethresult = await CoinGeckoClient.coins.fetch("ethereum", {});
    let ethPrice = new BigNumber(
      ethresult.data?.market_data?.current_price?.usd
    );
    // btcPrice

    const btcresult = await CoinGeckoClient.coins.fetch("bitcoin", {});
    let btcPrice = new BigNumber(
      btcresult.data?.market_data?.current_price?.usd
    );
    // btcPrice

    const cakeresult = await CoinGeckoClient.coins.fetch("milkshakeswap", {});
    let cakePrice = new BigNumber(
      cakeresult.data?.market_data?.current_price?.usd
    );

    let fg = {};

    if (lpTokens) {
      lpTokens.map((farm, i) => {
        // let cakePrice = new BigNumber(0.323);

        const cakeRewardPerBlock = new BigNumber(farm.eggPerBlock || 1) //0.07 * 0.333 = 0.02331
          .times(new BigNumber(farm.poolWeight))
          .div(new BigNumber(10).pow(18));
        const cakeRewardPerYear = cakeRewardPerBlock.times(10512000); // 0.02331 * 10512000 = 245,034.72

        let apy = cakePrice.times(cakeRewardPerYear); //0.347 * 245,034.72 = 85,027.04784

        let totalValue = new BigNumber(farm.lpTotalInQuoteToken || 0); // 527.058

        if (farm.quoteTokenSymbol === "BNB") {
          totalValue = totalValue.times(670); //527.058 * 245.45 = 129366.386
          if (totalValue.comparedTo(0) > 0) {
            apy = apy.div(totalValue); // 85,027.04 / 129366.38 = 0.657
          }
          const farmAPY =
            apy &&
            apy.times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
          fg["bnb"] = parseFloat(farmAPY).toFixed(2);
        } else if (farm.quoteTokenSymbol === "ETH") {
          totalValue = totalValue.times(ethPrice);
          if (totalValue.comparedTo(0) > 0) {
            apy = apy.div(totalValue); // 85,027.04 / 129366.38 = 0.657
          }
          const farmAPY =
            apy &&
            apy.times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
          fg["eth"] = parseFloat(farmAPY).toFixed(2);
        } else if (farm.quoteTokenSymbol === "BTC") {
          totalValue = totalValue.times(btcPrice);
          if (totalValue.comparedTo(0) > 0) {
            apy = apy.div(totalValue); // 85,027.04 / 129366.38 = 0.657
          }
          const farmAPY =
            apy &&
            apy.times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
          fg["btc"] = parseFloat(farmAPY).toFixed(2);
        } else if (farm.quoteTokenSymbol === "CAKE") {
          totalValue = totalValue.times(1);
          if (totalValue.comparedTo(0) > 0) {
            apy = apy.div(totalValue); // 85,027.04 / 129366.38 = 0.657
          }
          const farmAPY =
            apy &&
            apy.times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
          fg["milk"] = parseFloat(farmAPY).toFixed(2);
        } else {
          if (totalValue.comparedTo(0) > 0) {
            apy = apy.div(totalValue); // 85,027.04 / 129366.38 = 0.657
          }

          const farmAPY =
            apy &&
            apy.times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
          fg["busd"] = parseFloat(farmAPY).toFixed(2);
        }
      });

      // console.log(fg,"fg")

      return fg;
    }
  };

  const roiFunction = async (numberOfDays, apyValue) => {
    const g = {};
    const CoinGeckoClient = new CoinGecko();
    const cakeresult = await CoinGeckoClient.coins.fetch("milkshakeswap", {});
    let cakePrice = new BigNumber(
      cakeresult.data?.market_data?.current_price?.usd
    );
    let cakeEarnedPerThousand1D = calculateCakeEarnedPerThousandDollars({
      numberOfDays,
      apyValue,
      cakePrice,
    });
    const oneThousandDollarsWorthOfCake = 1000 / cakePrice.toNumber();
    let f = apyModalRoi({
      amountEarned: cakeEarnedPerThousand1D,
      amountInvested: oneThousandDollarsWorthOfCake,
    });
    g["roi"] = f;
    g["per"] = cakeEarnedPerThousand1D;
    return g;
  };

    console.log(userlpTokens,"userlpTokens")

  useEffect(() => {
    dataFunc();
    userLpData(userAccount);
    const isRegister = async (userAccount) => {
      if (userAccount) {
        if (objTwo) {
          let response = await objTwo.affinfo(userAccount);
          if (response) {
            setIsregistered(response.isregistered);
          }
        } else {
          console.error("Couldn't find")
        }
      }
    };
    isRegister(userAccount);
    async function d(lpTokens) {
      let c = await apr(lpTokens);
      setAprV(c);
    }
    const lp = localStorage.getItem("lptoken");
    const u = JSON.parse(lp);
    setLptoken(u);
    d(lpTokens2);
  }, [userAccount, lpTokens2]);

  const handleActive = () => {
    setActive(!active);
  };

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  return (
    <>
      {userAccount ? (
        isregistered ? (
          <>
            <div className="row justify-content-center text-center row-cols-2">
              <div className="col-sm-4 dflex">
                <div className="active-title">
                  {checked ? "Staked Only" : "Inactive"}
                </div>
                <Switch
                  onChange={handleChange}
                  checked={checked}
                  className="react-switch"
                  onColor="#C600FF"
                  onHandleColor="#000"
                  handleDiameter={35}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  height={50}
                  width={100}
                  id="material-switch"
                />
              </div>
              <div className="col-sm-4 dflex">
                <div className="active-title">
                  {active ? "Active" : "Inactive"}
                </div>
                <Switch
                  onChange={handleActive}
                  checked={active}
                  className="react-switch"
                  onColor="#C600FF"
                  onHandleColor="#000"
                  handleDiameter={35}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  height={50}
                  width={100}
                  id="material-switch"
                />
              </div>
            </div>
            {active ? (
              <div className="row justify-content-center mt-50">
                {lpTokens2 && userlpTokens ? (
                  <>
                    <FarmCard
                      title={lpTokens2[3].lpSymbol}
                      apr={aprV ? aprV.busd : 0}
                      deposit={lpTokens2[3].depositFeeBP}
                      milkEarn={parseFloat(
                        userlpTokens[3].earnings / wei
                      ).toFixed(3)}
                      farmClass="1"
                      multiplier={lpTokens2[3].multiplier}
                      farmImg={lpTokens2[3].farmImg}
                      login={access2}
                      userAccount={userAccount}
                      lpAddresses={lpTokens2[3].lpAddresses}
                      tot={lpTokens2[3].lpTotalInQuoteToken}
                      quoteTokenAdresses={lpTokens2[3].quoteTokenAdresses}
                      totliquidity={totliquidity2 ? totliquidity2.busd : 0}
                      stakedBalance={userlpTokens[3].stakedBalance / wei}
                      roiFunction={roiFunction}
                      pid={4}
                    />
                    <FarmCard
                      title={lpTokens2[4].lpSymbol}
                      apr={aprV ? aprV.bnb : 0}
                      deposit={lpTokens2[4].depositFeeBP}
                      milkEarn={parseFloat(
                        userlpTokens[4].earnings / wei
                      ).toFixed(3)}
                      farmClass="1"
                      multiplier={lpTokens2[4].multiplier}
                      farmImg={lpTokens2[4].farmImg}
                      login={access2}
                      userAccount={userAccount}
                      lpAddresses={lpTokens2[4].lpAddresses}
                      tot={lpTokens2[4].lpTotalInQuoteToken}
                      quoteTokenAdresses={lpTokens2[4].quoteTokenAdresses}
                      totliquidity={totliquidity2 ? totliquidity2.bnb : 0}
                      stakedBalance={userlpTokens[4].stakedBalance / wei}
                      roiFunction={roiFunction}
                      pid={4}
                    />
                    <FarmCard
                      title={lpTokens2[5].lpSymbol}
                      apr={aprV ? aprV.btc : 0}
                      deposit={lpTokens2[5].depositFeeBP}
                      milkEarn={parseFloat(
                        userlpTokens[5].earnings / wei
                      ).toFixed(3)}
                      farmClass="1"
                      multiplier={lpTokens2[5].multiplier}
                      farmImg={lpTokens2[5].farmImg}
                      login={access2}
                      userAccount={userAccount}
                      lpAddresses={lpTokens2[5].lpAddresses}
                      tot={lpTokens2[5].lpTotalInQuoteToken}
                      quoteTokenAdresses={lpTokens2[5].quoteTokenAdresses}
                      totliquidity={totliquidity ? totliquidity.btc : 0}
                      stakedBalance={userlpTokens[5].stakedBalance / wei}
                      roiFunction={roiFunction}
                      pid={4}
                    />
                    <FarmCard
                      title={lpTokens2[6].lpSymbol}
                      apr={aprV ? aprV.eth : 0}
                      deposit={lpTokens2[6].depositFeeBP}
                      milkEarn={parseFloat(
                        userlpTokens[6].earnings / wei
                      ).toFixed(3)}
                      farmClass="1"
                      multiplier={lpTokens2[6].multiplier}
                      farmImg={lpTokens2[6].farmImg}
                      login={access2}
                      userAccount={userAccount}
                      lpAddresses={lpTokens2[6].lpAddresses}
                      tot={lpTokens2[6].lpTotalInQuoteToken}
                      quoteTokenAdresses={lpTokens2[6].quoteTokenAdresses}
                      totliquidity={totliquidity2 ? totliquidity2.eth : 0}
                      stakedBalance={userlpTokens[6].stakedBalance / wei}
                      roiFunction={roiFunction}
                      pid={4}
                    />
                  </>
                ) : (
                  <Spinner />
                )}
              </div>
            ) : (
              <div className="row justify-content-center mt-50">
                <InFarmCard
                  title="MILK-BUSD LP"
                  img="milk-busd"
                  deposit="0"
                  milkEarn="0"
                  farmClass="1"
                />
                <InFarmCard
                  title="MILK-BNB LP"
                  img="milk-bnb"
                  deposit="0"
                  milkEarn="0"
                  farmClass="2"
                />
              </div>
            )}
          </>
        ) : (
          <FarmRegister />
        )
      ) : (
        <>
          <div className="row justify-content-center text-center row-cols-2">
            <div className="col-sm-4 dflex">
              <div className="active-title">
                {checked ? "Staked Only" : "Inactive"}
              </div>
              <Switch
                onChange={handleChange}
                checked={checked}
                className="react-switch"
                onColor="#C600FF"
                onHandleColor="#000"
                handleDiameter={35}
                uncheckedIcon={false}
                checkedIcon={false}
                height={50}
                width={100}
                id="material-switch"
              />
            </div>
            <div className="col-sm-4 dflex">
              <div className="active-title">
                {active ? "Active" : "Inactive"}
              </div>
              <Switch
                onChange={handleActive}
                checked={active}
                className="react-switch"
                onColor="#C600FF"
                onHandleColor="#000"
                handleDiameter={35}
                uncheckedIcon={false}
                checkedIcon={false}
                height={50}
                width={100}
                id="material-switch"
              />
            </div>
          </div>

          {active ? (
            <div className="row justify-content-center mt-50">
              {lpTokens2 ? (
                <>
                  <FarmCard
                    title={lpTokens2[3].lpSymbol}
                    apr={aprV ? aprV.busd : 0}
                    deposit={lpTokens2[3].depositFeeBP}
                    milkEarn="0"
                    farmClass="1"
                    multiplier={lpTokens2[3].multiplier}
                    farmImg={lpTokens2[3].farmImg}
                    login={access2}
                    userAccount={userAccount}
                    lpAddresses={lpTokens2[3].lpAddresses}
                    tot={lpTokens2[3].lpTotalInQuoteToken}
                    quoteTokenAdresses={lpTokens2[3].quoteTokenAdresses}
                    totliquidity={totliquidity2 ? totliquidity2.busd : 0}
                    stakedBalance="0"
                    roiFunction={roiFunction}
                  />
                  <FarmCard
                    title={lpTokens2[4].lpSymbol}
                    apr={aprV ? aprV.bnb : 0}
                    deposit={lpTokens2[4].depositFeeBP}
                    milkEarn="0"
                    farmClass="1"
                    multiplier={lpTokens2[4].multiplier}
                    farmImg={lpTokens2[4].farmImg}
                    login={access2}
                    userAccount={userAccount}
                    lpAddresses={lpTokens2[4].lpAddresses}
                    tot={lpTokens2[4].lpTotalInQuoteToken}
                    quoteTokenAdresses={lpTokens2[4].quoteTokenAdresses}
                    totliquidity={totliquidity2 ? totliquidity2.bnb : 0}
                    stakedBalance="0"
                    roiFunction={roiFunction}
                  />
                  <FarmCard
                    title={lpTokens2[5].lpSymbol}
                    apr={aprV ? aprV.btc : 0}
                    deposit={lpTokens2[5].depositFeeBP}
                    milkEarn="0"
                    farmClass="1"
                    multiplier={lpTokens2[5].multiplier}
                    farmImg={lpTokens2[5].farmImg}
                    login={access2}
                    userAccount={userAccount}
                    lpAddresses={lpTokens2[5].lpAddresses}
                    tot={lpTokens2[5].lpTotalInQuoteToken}
                    quoteTokenAdresses={lpTokens2[5].quoteTokenAdresses}
                    totliquidity={totliquidity2 ? totliquidity2.btc : 0}
                    stakedBalance="0"
                    roiFunction={roiFunction}
                  />
                  <FarmCard
                    title={lpTokens2[6].lpSymbol}
                    apr={aprV ? aprV.eth : 0}
                    deposit={lpTokens2[6].depositFeeBP}
                    milkEarn="0"
                    farmClass="1"
                    multiplier={lpTokens2[6].multiplier}
                    farmImg={lpTokens2[6].farmImg}
                    login={access2}
                    userAccount={userAccount}
                    lpAddresses={lpTokens2[6].lpAddresses}
                    tot={lpTokens2[6].lpTotalInQuoteToken}
                    quoteTokenAdresses={lpTokens2[6].quoteTokenAdresses}
                    totliquidity={totliquidity2 ? totliquidity2.eth : 0}
                    stakedBalance="0"
                    roiFunction={roiFunction}
                  />
                </>
              ) : (
                <Spinner />
              )}
            </div>
          ) : (
            <div className="row justify-content-center mt-50">
              <InFarmCard
                title="MILK-BUSD LP"
                img="milk-busd"
                deposit="0"
                milkEarn="0"
                farmClass="1"
              />
              <InFarmCard
                title="MILK-BNB LP"
                img="milk-bnb"
                deposit="0"
                milkEarn="0"
                farmClass="2"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default FarmTab;
