const World = () => {
  

  return (
    <>
      <div className="container mt-150 m-50">
        <div className="text-center world-heading">$MILK IS IN EVERY AIR</div>
        <div className="world animation"></div>
        <div className="section man-banner">
          <ul className="list-unstyled shape-group-20">
            <li className="shape shape-4">
              <img
                src={require("../../images/others/bubble-14.png")}
                alt="Bubble"
              />
            </li>
            <li className="shape shape-5">
              <img
                src={require("../../images/others/bubble-38.png")}
                alt="Bubble"
              />
            </li>
            <li className="shape shape-7">
              <img
                src={require("../../images/others/bubble-31.png")}
                alt="Bubble"
              />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default World;
