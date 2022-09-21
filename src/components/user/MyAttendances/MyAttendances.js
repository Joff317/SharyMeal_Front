import React, { useState } from "react";
import DisplayAttendances from "./DisplayAttendances";
import SectionTitle from "../../titles/SectionTitle";
import SubsectionTitle from "../../titles/SubsectionTitle";

function MyAttendances({ userData }) {
  const [period, setPeriod] = useState("future");

  // console.log(userData.guested_meals);

  return (
    <>
      <SubsectionTitle> Vos réservations </SubsectionTitle>
      <div className="tabs-container flex gap-4 border-b border-b-grey-border mt-4 w-fit  font-light-font h-[29px]">
        <button
          className={
            period === "future" && "border-b-4 pb-3 border-green font-book-font"
          }
          onClick={() => setPeriod("future")}
        >
          {" "}
          Réservations futures{" "}
        </button>

        <button
          className={
            period === "past" && "border-b-4 pb-3 font-book-font border-green"
          }
          onClick={() => setPeriod("past")}
        >
          {" "}
          Réservations passées{" "}
        </button>
      </div>

      <DisplayAttendances period={period} meals={userData.guested_meals} />
    </>
  );
}

export default MyAttendances;
