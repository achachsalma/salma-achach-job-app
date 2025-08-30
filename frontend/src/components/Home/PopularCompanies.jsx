import React from "react";
import { FaGoogle, FaApple, FaAmazon, FaBuilding, FaIndustry } from "react-icons/fa";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "OCP Group",
      location: "Casablanca, Morocco",
      openPositions: 12,
      icon: <FaIndustry />, // icône générique industrie
    },
    {
      id: 2,
      title: "Google",
      location: "California, USA",
      openPositions: 25,
      icon: <FaGoogle />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Cupertino, USA",
      openPositions: 18,
      icon: <FaApple />,
    },
    {
      id: 4,
      title: "Amazon",
      location: "Seattle, USA",
      openPositions: 30,
      icon: <FaAmazon />,
    },
    {
      id: 5,
      title: "Maroc Telecom",
      location: "Rabat, Morocco",
      openPositions: 9,
      icon: <FaBuilding />, 
    },
  ];

  return (
    <div className="companies">
      <div className="container">
        <h3>TOP COMPANIES</h3>
        <div className="banner">
          {companies.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                <button>Open Positions {element.openPositions}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
