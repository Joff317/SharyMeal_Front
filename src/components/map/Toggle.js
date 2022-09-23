import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { inputDataAtom } from "../../atoms/inputData";
import { useEffect, useRef, useState } from "react";
import { CheckedAtom } from "../../atoms/Checked";
// import React from "react";

// import { inputDataAtom } from '../../atoms/inputData';

function Toggle({ setBoolean, boolean, name }) {
  const setInputData = useSetAtom(inputDataAtom);
  const toggleChecked = useRef();
  const [defaultCheck, setDefaultChecked] = useAtom(CheckedAtom);

  useEffect(() => {
    if (name === "save") {
      if (!toggleChecked.current.checked) {
        setInputData({
          city: "",
          lat: "",
          lon: "",
          date: "",
        });
        let input = document.getElementById("inputCity");
        input.value = "";
        setDefaultChecked(false);
      } else if (toggleChecked.current.checked) {
        setDefaultChecked(true);
      }
    }
  }, [boolean]);

  return (
    <div className="relative ml-18">
      <label
        htmlFor={name}
        className="inline-flex relative items-center cursor-pointer"
      >
        <input
          type="checkbox"
          value=""
          ref={toggleChecked}
          defaultChecked={name === "save" ? defaultCheck : false}
          id={name}
          className="sr-only peer"
          onClick={() => setBoolean(!boolean)}
        />
        <div className="w-11 h-6 bg-grey peer-focus:outline-none rounded-full peer dark:bg-grey peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-grey after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-grey peer-checked:bg-green"></div>
      </label>
    </div>
  );
}

export default Toggle;
