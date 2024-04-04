import React from "react";
import { hatch } from "ldrs";

hatch.register();

const LoadingHatch = ({
  size = "28",
  stroke = "4",
  speed = "3.5",
  color = "white",
}) => {
  return (
    <l-hatch size={size} stroke={stroke} speed={speed} color={color}></l-hatch>
  );
};

export default LoadingHatch;
