function Autocompletion({ res, setAutocompleteVisible, setCityInfo, origin }) {
  const handleClick = () => {
    setAutocompleteVisible(false);
    setCityInfo(res);

    let input;

    if (origin === "geolocation") {
      input = document.getElementById("inputCity");
      input.value = `${res.city}, ${res.country}`;
    }

    if (origin === "createMeal") {
      input = document.getElementById("inputAddress");
      input.value = res.formatted;
    }

    if (origin === "userProfile") {
      input = document.getElementById("inputCityUser");
      input.value = res.formatted;
    }
  };

  return (
    <p
      className="border-b border-grey !w-full py-2 hover:bg-green_light rounded-lg px-4 cursor-pointer font-light-font"
      onClick={() => handleClick()}
    >
      {res.formatted}
    </p>
  );
}

export default Autocompletion;
