import React from "react";
import "./style.css";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService";

function Test(props) {
  const handleClick = async () => {
    try {
      const response = await quanLyDatVeService.createPaymentLink();
      console.log(response);
      window.location.href = response.data.checkoutUrl;
    } catch (error) {
      console.error("Error creating payment link:", error);
    }
  };

  return (
    <div className="body">
      <img src="https://i.ibb.co/cTfFTYP/Layer-2.png" />
      <button onClick={handleClick}>Mua hàng</button>
    </div>
  );
}

export default Test;
