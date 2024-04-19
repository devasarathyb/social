import React from "react";
import "./home.scss";
import Story from "../../components/stories/Story";
import Feeds from "../../components/feeds/Feeds";
import Share from "../../components/share/Share";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Home = () => {
  const queryClients = new QueryClient();
  return (
    <div className="home">
      <Story />
      <Share />
      <Feeds />
    </div>
  );
};

export default Home;
