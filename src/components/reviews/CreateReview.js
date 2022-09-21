import Cookies from "js-cookie";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Close from "../../icons/Close";
import { API } from "../../utils/variables";
import Button from "../actions/Button";
import {
  errorInput,
  errorMessage,
  errorMessageValues,
} from "../authentication/errors";
import SectionTitle from "../titles/SectionTitle";

function CreateReview({ setShowReview, mealData }) {
  //   console.log(mealData);
  const token = Cookies.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitData = (data) => {
    fetch(API + "reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        review: {
          host_id: mealData.host.id,
          content: data.content,
          rating: data.rating,
        },
      }),
    })
      .then((res) => res.json())
      .then(() => setShowReview(false));
  };

  return (
    <div>
      <form
        className="max-h-[500px] pb-14 mt-3 overflow-scroll"
        onSubmit={handleSubmit(submitData)}
      >
        <div className="flex flex-col mt-8">
          <label htmlFor="">Laissez un commentaire</label>
          <input
            type="text"
            name="content"
            {...register("content", errorMessageValues.content)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Mettez une note</label>
          <input
            type="number"
            min={1}
            max={5}
            name="rating"
            {...register("rating", errorMessageValues.rating)}
          />
        </div>

        <span
          className="absolute top-5 right-5"
          onClick={() => setShowReview(false)}
        >
          <Button showIcon={true} icon={<Close />}></Button>
        </span>

        <button
          type="submit"
          className="my-2 flex justify-start fixed bottom-4 left-[40%]"
        >
          <Button showText> Laisser un avis </Button>
        </button>
      </form>
    </div>
  );
}

export default CreateReview;
