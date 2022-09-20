import React from "react";
import { inputDataAtom } from "../../atoms/inputData";
import { useAtomValue } from "jotai";

function ToggleMap({ setMapVisib, mapVisib }) {
  const inputData = useAtomValue(inputDataAtom);

  const handleToggle = (e) => {
    fetch(
      `https://api.geoapify.com/v1/geocode/search?city=${inputData.city}&format=json&apiKey=9aa5158850824f25b76a238e1d875cc8`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data DE TOGGLE MAP : ", data);
        // setMapCenter([data.results[0].lat, data.results[0].lon]);
        setMapVisib(!mapVisib);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="relative ml-18">
      <label
        htmlFor="default-toggle"
        className="inline-flex relative items-center cursor-pointer"
      >
        <input
          type="checkbox"
          value=""
          id="default-toggle"
          className="sr-only peer"
          onClick={handleToggle}
        />
        <div className="w-11 h-6 bg-grey peer-focus:outline-none rounded-full peer dark:bg-grey peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-grey after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-grey peer-checked:bg-green"></div>
        <span className="ml-3 text-sm font-medium text-grey dark:text-grey">
          Map view
        </span>
      </label>
    </div>
  );
}

export default ToggleMap;
