import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { setSearchQueryText } from "@/Redux/JobSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graph Designer",
  "Full Stack",
];
const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchQueryText(query));
    navigate("/browse");
  };

  return (
    <div className=" ml-4">
      <Carousel className=" md:w-full    w-60  max-w-xl mx-auto my-20">
        <CarouselContent >
          {category.map((cat, ind) => (
            <CarouselItem key={ind} className="md:basis-1/2 lg-basis-1/3  text-center  ">
              <Button
                onClick={() => searchJobHandler(cat)}
                className="rounded-full">
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      
    </div>
  );
};

export default CategoryCarousel;
