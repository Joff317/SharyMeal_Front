function Autocompletion({ res, setAutocompleteVisible, setCityInfo }) {
  const handleClick = () => {
    setAutocompleteVisible(false);
    setCityInfo(res);

    let input = document.getElementById("inputCity");
    input.value = `${res.city}, ${res.country}`;
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
