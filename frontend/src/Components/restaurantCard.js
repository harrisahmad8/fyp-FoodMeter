import React from "react";
import { useNavigate } from "react-router-dom";
export const RestaurantCard = ({data}) => {
  const navigate=useNavigate()
  if (!Array.isArray(data)) {
    console.error('Data is not an array:', data);
    return null; // or handle the error in a way that makes sense for your application
  }
    return (
      <div className="p-5 items-center flex justify-center grid-column-1  grid-rows-3 gap-20 shadow-md bg-whitesmoke m-auto w-full h-full rounded-2xl
      ">
        {data.map((data, index) => (
        <div key={index}>
          <button onClick={() =>
            navigate("/ReviewPortal", {
              state: { restaurant: data._id },
            })
          }>
         <div class="max-w-sm rounded overflow-hidden shadow-lg m-auto mt-10 w-full h-100">
         <img class="w-full h-auto rounded-2xl" src={data.logoPath} alt="Sunset in the mountains"/>
         <div class="px-6 py-4">
           <div class="font-bold text-xl mb-2">{data.name}</div>
           <p class="text-gray-700 text-base">
             
           </p>
         </div>
         <div class="px-6 pt-4 pb-2">
          {data.userRating &&(
           <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">User Rating:{data.userRating.toFixed(1)}</span>
           )}
           {data.systemRating &&(
           <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">System Rating:{data.systemRating.toFixed(1)}
</span>
)}
           <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">cuisine:{data.foodType}</span>
         </div>
       </div>
       </button>
       </div>
        ))}
      </div>
    );
  }
  