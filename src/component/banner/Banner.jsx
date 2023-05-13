const HomeBanner = () => {
  return (
    <div className="section main-banner">

      <ul className="list-unstyled shape-group-20">
        <li className="shape shape-1">
          <img
            src={require("../../images/others/bubble-36.png")}
            alt="Bubble"
          />
        </li>
        <li className="shape shape-4">
          <img
            src={require("../../images/others/bubble-14.png")}
            alt="Bubble"
          />
        </li>
      </ul>
    </div>
  );
};

export default HomeBanner;
