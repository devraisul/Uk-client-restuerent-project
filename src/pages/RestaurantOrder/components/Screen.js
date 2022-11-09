import { useContext } from "react";
import { Textfit } from 'react-textfit';
import { AdminOrderContext } from "../context/AdminOrderContext";
import { CalcContext } from "../context/CalcContext";

const Screen = () => {
  const { calc } = useContext(CalcContext);
  const {cartData} = useContext(AdminOrderContext)
  return (
    <Textfit className="calcScreen" max={40}  mode="single">{calc.num ? calc.num : calc.res}</Textfit>
  )
}

export default Screen