import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals"

export const Home = () => {

  return (
    <>
      <div className='jumbotron text-danger h1 font-weight-bold text-center'>
        <Jumbotron text={["New Arrivals", "Best Sellers", "Latest Products"]} />
      </div>

      <h4 className="text-center p-3 mt-5 mb-5 jumbotron">New Arrivals</h4>
      <NewArrivals/>
    </>
  );
};

export default Home;
