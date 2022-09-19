import React from "react";
import ReactLoading from "react-loading";

function OrderLoader({ type, color, height, width }) {
  return (
    <div className="w-10 flex justify-center items-center mt-3">
      <ReactLoading type={type} color={color} height={60} width={90} />
    </div>
  );
}

export default OrderLoader;
