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
      className={`w-fit pt-3 px-4 flex justify-center items-center pb-1 max-w-[76px] max-h-[78px] ${
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
        <p className={`mt-3 font-book-font text-[14px]`}> {label} </p>
      </div>
    </div>
  );
}

export default CategoryItem;
