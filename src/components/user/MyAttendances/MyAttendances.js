import React, { useState } from "react";
import DisplayAttendances from "./DisplayAttendances";
import SubsectionTitle from "../../titles/SubsectionTitle";

function MyAttendances({ userData, forceUpdate }) {
  const [period, setPeriod] = useState("future");

  return (
    <>
      <SubsectionTitle> Vos réservations </SubsectionTitle>
      <div className="tabs-container flex gap-4 border-b border-b-grey-border mt-4 w-fit  font-light-font h-[29px]">
        <button
          className={
            period === "future"
              ? "border-b-4 pb-3 border-green font-book-font"
              : undefined
          }
          onClick={() => setPeriod("future")}
        >
          {" "}
          Réservations futures{" "}
        </button>

        <button
          className={
            period === "past"
              ? "border-b-4 pb-3 font-book-font border-green"
              : undefined
          }
          onClick={() => setPeriod("past")}
        >
          {" "}
          Réservations passées{" "}
        </button>
      </div>

      <DisplayAttendances
        period={period}
        meals={userData.guested_meals}
        forceUpdate={forceUpdate}
      />
    </>
  );
}

export default MyAttendances;
