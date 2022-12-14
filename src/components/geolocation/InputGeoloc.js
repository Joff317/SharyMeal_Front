import Button from "../actions/Button";
import { useState, forwardRef } from "react";
import Autocompletion from "./Autocompletion";
import { useAtomValue, useSetAtom } from "jotai";
import { inputDataAtom } from "../../atoms/inputData";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr";
import Search from "../../icons/Search";
import env from "react-dotenv";

function InputGeoloc({ saveSearchData }) {
  const [autocompleteVisible, setAutocompleteVisible] = useState(false);
  const [autocomplete, setAutocomplete] = useState(false);
  const [cityInfo, setCityInfo] = useState();
  const setInputData = useSetAtom(inputDataAtom);
  const inputDataValue = useAtomValue(inputDataAtom);
  const [startDate, setStartDate] = useState(new Date().setHours(0, 0, 0));

  registerLocale("fr", fr);

  function onSubmit(e) {
    e.preventDefault();
    if (e.target.cityInput.value.length === 0) {
      setInputData({
        city: "",
        lat: "",
        lon: "",
        date: startDate,
      });
    } else {
      setInputData({
        city: cityInfo ? cityInfo.city : inputDataValue.city,
        lat: cityInfo ? cityInfo.lat : inputDataAtom.lat,
        lon: cityInfo ? cityInfo.lon : inputDataAtom.lon,
        date: startDate,
      });
    }

    const targetScroll = document.getElementById("titleScroll");
    targetScroll.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  const getLocationData = async (e) => {
    if (e.target.value.length >= 3) {
      fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${e.target.value}&format=json&apiKey=9aa5158850824f25b76a238e1d875cc8`
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
  };

  const getTodayAtMidnight = (date) => {
    console.log("date", date);
    date.setHours(0, 0, 0);
    console.log("date", date);
    setStartDate(date);
  };

  return (
    <div className="rounded-full z-50 bg-white w-fit py-2 pl-6 pr-2 relative">
      <form onSubmit={(e) => onSubmit(e)} className={`flex items-center`}>
        <label className="text-sm"> Quelle ville ? </label>
        <input
          className="pl-2 mt-0.5 text-sm font-light-font focus:visible "
          type="text"
          id="inputCity"
          onChange={getLocationData}
          name="cityInput"
          placeholder="Aucune s??lection"
          defaultValue={inputDataValue && inputDataValue.city}
          autoComplete="off"
        />
        {autocompleteVisible && (
          <div className="border border-slate-500 z-50 rounded-lg p-2 absolute top-16 left-16 z-10 bg-white">
            {" "}
            {autocomplete &&
              autocomplete.results.map((res, index) => (
                <Autocompletion
                  key={index}
                  res={res}
                  setCityInfo={setCityInfo}
                  setAutocompleteVisible={setAutocompleteVisible}
                  origin="geolocation"
                />
              ))}
          </div>
        )}
        <div className="flex items-center gap-2 ">
          <label className="text-sm min-w-[80px]"> ?? partir du :</label>

          <span className="text-sm font-light-font">
            {" "}
            <DatePicker
              selected={startDate && startDate}
              onChange={(date) => getTodayAtMidnight(date)}
              dateFormat="d MMMM yyyy"
              locale="fr"
              minDate={new Date()}
            />{" "}
          </span>
        </div>

        <button type="submit">
          <Button showIcon={true} icon={<Search />} />
        </button>
      </form>
    </div>
  );
}

export default InputGeoloc;
