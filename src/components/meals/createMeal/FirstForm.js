import {
  errorInput,
  errorMessage,
  errorMessageValues,
} from "../../authentication/errors";
import { categories } from "../../../data/Category";
import React from "react";
import { useForm } from "react-hook-form";

function FirstForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div className="flex flex-col">
        <p> Titre </p>
        <input
          className={`border h-10 pl-3 rounded-md  ${errorInput(errors.title)}`}
          type="text"
          {...register("title", errorMessageValues.title)}
        />
        {errorMessage(errors.title)}
      </div>

      <div className="flex gap-8">
        {categories.map((category) => (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              value={category.id}
              className={`border h-10 pl-3 rounded-md border-grey `}
              {...register(`categories`)}
            />
            <p>
              {" "}
              {category.id} {category.label}{" "}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        <p> Description </p>
        <input
          className={`border h-10 pl-3 rounded-md  ${errorInput(
            errors.description
          )}`}
          type="text"
          {...register("description", errorMessageValues.description)}
        />
        {errorMessage(errors.description)}
      </div>
    </>
  );
}

export default FirstForm;
