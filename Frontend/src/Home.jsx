import React, { useEffect } from "react";
import HeroSections from "./frontendComponents/HomePageCom/HeroSections";
import CategoryCarousel from "./frontendComponents/HomePageCom/CategoryCarousel";
import LatestJob from "./frontendComponents/HomePageCom/LatestJob";
import useGetAllJob from "./Hooks/useGetAllJob";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetAllJob();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigate("/admin/companies");
    }
  });
  return (
    <div className="mx-auto relative w-full left-6">
      <HeroSections />

      <CategoryCarousel />
      <LatestJob />
    </div>
  );
};

export default Home;
