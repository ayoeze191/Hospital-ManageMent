import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { getcardDetails, cardRequest } from "../../Store/Action/CardAction";
import valid from "./../../assets/valid.png"
const HealthCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const details = useAppSelector((state) => state.card);
  const user = useAppSelector((state) => state.auth);
//   console.log(details)
  useEffect(() => {
    dispatch(getcardDetails());
  }, [user, details.cardnumber]);
  const [showcard, setShowCard] = useState<boolean>(false);

  return (
    <div className="flex-1">
      {details.approved == "Card Not Generated" ? (
        <>
          {details.approved == "Card Not Generated"&&<div className="text-red-500 mb-10">
            Please Note: Card is needed to generate To Person Some Functions
            Here
          </div>}
          <div>
            Apply For Card Here
            <button className="bg-green-500 p-3 text-white" onClick={() => dispatch(cardRequest())}>
              Apply for Card
            </button>
          </div>
        </>
      ) : details.approved == "Pending" ? (
        <div className="bg-white w-[50%] mx-auto max-w-xl flex flex-col gap-6 text-center py-5 px-2">
            <div className="w-20 mx-auto"><img src={valid} className = 'w-full'/></div>
         <h1 className="font-extrabold"> Thank You! {details.email}</h1>
          <p>Your Card Request was Succesfull, Please Wait for Verification</p>
        </div>
      ) : (
        <div>
            Click Here to View Your Card
            <button className="px-5 py-3 bg-green-600 text-white font-bold mb-10 ml-4" onClick={() => setShowCard(!showcard)}>View Card</button>
           {showcard&& <div className="px-3 py-3 bg-slate-500 text-white max-w-xl flex flex-col gap-5">
                <div className="flex justify-between  ">
                <h3 className="text-xl font-bold italic">HEALTH</h3><div>HEALTH CARD</div>
                </div>
               <div className="mb-3">CARD NUMBER</div> 
                <div className="flex gap-8">
                {details.cardnumber?.split(" ").map((num, index) => {
                    return <div key={num} className='border-solid flex border border-green-800'>
                        {num}
                    </div>
                })}  
                </div>
                <div className="flex justify-between w-full">
                    <div><div className="font-bold">CARD OWNER</div>{details.email}</div>
                   <div className="font-bold">EXPIRE<div>{details!.expiredate! as any}</div></div>
                </div>
            </div>
}
            </div>
      )}
    </div>
  );
};

export default HealthCard;
