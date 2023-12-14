import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";


import { Rate,Button,message } from 'antd'
export const RestaurantCard = ({data}) => {
  const navigate=useNavigate()
  if (!Array.isArray(data)) {
    console.error('Data is not an array:', data);
    console.log()
    // or handle the error in a way that makes sense for your application
  }
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from local storage on component mount
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  console.log("favorites",favorites)

  const addToFavorites = () => {
    // Check if the restaurant is already in favorites
    if (!favorites.some((fav) => fav._id === data._id)) {
      const updatedFavorites = [...favorites, data];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      message.success("Added to Favorites");
    } else {
      message.warning("Restaurant is already in Favorites");
    }
  };

  const removeFromFavorites = () => {
    const updatedFavorites = favorites.filter((fav) => fav._id !== data._id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    message.success("Removed from Favorites");
  };
    return (
      <div className="p-5 items-center grid grid-cols-3 gap-20 shadow-md bg-whitesmoke m-auto w-full h-full rounded-2xl">
        {data.map((data, index) => (
        <div key={index}>
          <button onClick={() =>
            navigate("/ReviewPortal", {
              state: { restaurant: data._id },
            })
          }>
         
       <div className="h-[550px] w-[300px] bg-gray-100 shadow-md ounded-xl flex flex-col">
          <div className="h-[70%] w-full bg-gray-600 rounded-xl">
              <img className="object-cover h-full w-full rounded-xl" src={data.logoPath}   alt=""       />
          </div>  
          <div className=" p-1">
          <div class="font-bold text-base whitespace-normal text-gray-700 mt-5 truncate text-center mx-auto mb-2">{data.name}</div>
          <div class="font-bold text-base whitespace-normal text-gray-600 mt-1 truncate text-center mx-auto mb-1">{data.foodType}</div>
          <div class="pt-4 pb-2">
           {data.systemRating &&(
           <span class="inline-block  rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        <Rate value={data.systemRating} disabled allowHalf/>
                       <span className="text-yellow-500 text-xl pl-1">{data.systemRating.toFixed(1)}</span>
</span>

)}
 <Button
                    type="primary"
                    shape="circle"
                    icon={
                      favorites.some((fav) => fav._id === data._id)?
                         (<HeartFilled style={{color:"red"}}/>)
                        : (<HeartOutlined style={{color:"black"}}/>)
                    }
                    onClick={() =>
                      favorites.some((fav) => fav._id === data._id)
                        ? removeFromFavorites()
                        : addToFavorites()
                    }
                    style={{
                      color: favorites.some((fav) => fav._id === data._id)
                        ? "red"  // Color when the restaurant is in favorites
                        : "black"  // Color when the restaurant is not in favorites
                    }}
                  />

          
         </div>
          </div>
       </div>
       </button>
       </div>
        ))}
      </div>
    );
  }
  