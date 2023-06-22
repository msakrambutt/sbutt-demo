"use client";
const Underfooter = () => {
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 justify-around items-center my-8">
      <div className="text-gray-500">
        Copyright © 2022 Dine<br></br>Market
      </div>
      <div>
        <span className="text-gray-500">Design by.</span>
        <span className="font-bold">
          Weird<br></br>Design Studio
        </span>
      </div>
      <div>
        <span className="text-gray-500">Code by.</span>
        <span className="font-bold">
          shabrina12 on<br></br>
          github
        </span>
      </div>
    </div>
  );
};

export default Underfooter;
