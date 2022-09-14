import Button from "../actions/Button";
import Arrow from "../../icons/Arrow";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Autocompletion from "./Autocompletion";
import { useAtomValue, useSetAtom } from "jotai";
import { inputDataAtom } from "../../atoms/inputData";

function InputGeoloc() {
  const { register, handleSubmit } = useForm();
  const [autocompleteVisible, setAutocompleteVisible] = useState(false);
  const [autocomplete, setAutocomplete] = useState(false);
  const [cityInfo, setCityInfo] = useState();
  const setInputData = useSetAtom(inputDataAtom);
  const inputDataValue = useAtomValue(inputDataAtom);

  function onSubmit(data) {
    setInputData({
      city: cityInfo.city,
      date: data.date,
    });
  }

  console.log(inputDataValue);

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
      <form onSubmit={handleSubmit(onSubmit)} className={`flex items-center`}>
        <label className="text-sm"> Ta ville :</label>
        <input
          className="pl-2 mt-0.5 text-sm font-light-font focus:visible "
          type="text"
          id="inputCity"
          onChange={getData}
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
        <label className="text-sm"> Quand ? </label>
        <input
          className="text-sm pl-2 mt-0.5 font-light-font"
          type="text"
          {...register("date")}
        />

        <button type="submit">
          <Button showIcon={true} icon={<Arrow />} />
        </button>
      </form>
    </div>
  );
}

export default InputGeoloc;
