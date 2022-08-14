/* eslint-disable jsx-a11y/alt-text */
import { useContext, useState } from "react";
import BarImg from "../../assets/Images/BarImg.png";
import ChartImg from "../../assets/Images/ChartImg.png";
import { ToggleContext } from "../../components/Result";

function Toggle() {
  const { toggle, setToggle } = useContext(ToggleContext);

  const toggleClass = " transform translate-x-6";
  return (
    <div className="flex flex-wrap flex-row">
      <img src={BarImg} className="h-7 w-7 mr-3" />
      <div
        className="md:w-14 md:h-7 w-12 h-6 flex items-center bg-teal-300 rounded-full p-1 cursor-pointer"
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        <div
          className={
            "bg-white md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform" +
            (toggle ? null : toggleClass)
          }
        ></div>
      </div>
      <img src={ChartImg} className="h-7 w-7 ml-3" />
    </div>
  );
}

export default Toggle;
