import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";

const CategoryCarousel = () => {
  const category = [
    "FullStack Developer",
    "Front End Developer",
    "Back End Developer",
    "Data Scientist",
    "AI/ML developer",
    "UI/UX Developer",
  ];

  return (
    <>
      <div>
        <Carousel className="w-full max-w-xl mx-auto mt-40 ">
          <CarouselContent>
            {category.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 ">
                <Button className="bg-green-700 hover:bg-green-600">
                  {item}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className=" h-10 w-10 border-2 border-red-900" />
          <CarouselNext className=" h-10 w-10 border-2 border-red-900" />
        </Carousel>
      </div>
    </>
  );
};

export default CategoryCarousel;
