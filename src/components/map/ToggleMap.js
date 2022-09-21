import React from "react";

function ToggleMap({ setMapVisib, mapVisib }) {

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
          onClick={() => setMapVisib(!mapVisib)}
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
