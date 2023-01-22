import { useState } from "react";

const Counter = () => {
  return (
    <div className="h-[30%] w-full bg-light rounded-3xl flex items-center justify-evenly flex-col p-8">
      <h1 className="text-3xl">
        <span className="text-primary">17</span> - Doğru
      </h1>
      <h1 className="text-3xl">
        <span className="text-[#bc4d3e]">3</span> - Yanlış
      </h1>
    </div>
  );
};

export default Counter;
