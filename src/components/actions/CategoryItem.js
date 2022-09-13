import { useState } from "react";

function CategoryItem({ label, icon, setCategoriesArray, categoriesArray }) {
  const [active, setActive] = useState(false);

  function handleClick() {
    setActive(!active);
    if (categoriesArray.includes(label)) {
      setCategoriesArray(
        categoriesArray.filter((category) => category !== label)
      );
    } else {
      setCategoriesArray([...categoriesArray, label]);
    }
  }

  return (
    <div
      className={`w-fit pt-3 px-4 pb-1 ${
        active && "bg-green_light rounded-md"
      } hover:bg-green_light hover:rounded-md cursor:pointer`}
      onClick={() => {
        handleClick();
      }}
    >
      <div
        className={`flex flex-col items-center justify-center w-fit cursor-pointer`}
      >
        {icon}
        <p className={`mt-2 font-book-font`}> {label} </p>
      </div>
    </div>
  );
}

export default CategoryItem;
