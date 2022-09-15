import Button from "../actions/Button";
import Arrow from "../../icons/Arrow";
import { useState, forwardRef } from "react";
import Autocompletion from "./Autocompletion";
import { useAtomValue, useSetAtom } from "jotai";
import { inputDataAtom } from "../../atoms/inputData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function InputGeoloc() {
  const [autocompleteVisible, setAutocompleteVisible] = useState(false);
  const [autocomplete, setAutocomplete] = useState(false);
  const [cityInfo, setCityInfo] = useState();
  const setInputData = useSetAtom(inputDataAtom);
  const inputDataValue = useAtomValue(inputDataAtom);
  const [startDate, setStartDate] = useState(new Date());

  function onSubmit(e) {
    e.preventDefault();
    if (e.target.cityInput.value.length === 0) {
      setInputData({
        city: "",
        date: startDate,
      });
    } else {
      setInputData({
        city: cityInfo && cityInfo.city,
        date: startDate,
      });
    }

    const targetScroll = document.getElementById("titleScroll");
    targetScroll.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "end",
    });
  }

  function getData(e) {
    if (e.target.value.length > 4) {
      fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${e.target.value}&type=city&format=json&apiKey=9aa5158850824f25b76a238e1d875cc8`
      )
        .then((response) => response.json())
        .then((data) => {
          setAutocompleteVisible(true);
          setAutocomplete(data);
        })
        .catch((err) => console.error(err));
    } else {
      setAutocompleteVisible(false);
    }
  }

  return (
    <div className="rounded-full bg-white w-fit py-2 pl-6 pr-2 relative">
      <form onSubmit={(e) => onSubmit(e)} className={`flex items-center`}>
        <label className="text-sm"> Ta ville :</label>
        <input
          className="pl-2 mt-0.5 text-sm font-light-font focus:visible "
          type="text"
          id="inputCity"
          onChange={getData}
          name="cityInput"
          placeholder="Aucune sélection"
        />
        {autocompleteVisible && (
          <div className="border border-slate-500 rounded-lg p-2 absolute top-16 left-16 z-10 bg-white">
            {" "}
            {autocomplete &&
              autocomplete.results.map((res) => (
                <Autocompletion
                  res={res}
                  setCityInfo={setCityInfo}
                  setAutocompleteVisible={setAutocompleteVisible}
                />
              ))}
          </div>
        )}
        <div className="flex items-center gap-2 ">
          <label className="text-sm min-w-[80px]"> À partir du :</label>

          <span className="text-sm font-light-font">
            {" "}
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />{" "}
          </span>
        </div>

        <button type="submit">
          <Button showIcon={true} icon={<Arrow />} />
        </button>
      </form>
    </div>
  );
}

export default InputGeoloc;
