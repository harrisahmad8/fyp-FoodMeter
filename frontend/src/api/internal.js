import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_INTERNAL_API_PATH,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const baseURL='http://localhost:5000'
export const login = async (data) => {
  let response;

  try {
    response = await api.post(`${baseURL}/login`, data);
  } catch (error) {
    return error;
  }

  return response;
};

export const signup = async (data) => {
  let response;

  try {
    response = await api.post(`${baseURL}/register`, data);
  } catch (error) {
    return error;
  }

  return response;
};

export const signout = async () => {
  let response;
  try {
    response = await api.post(`${baseURL}/logout`);
  } catch (error) {
    return error;
  }

  return response;
};

export const autoLogin= async() =>{
  let response;
  try { 
    response= await api.get(`${baseURL}/refresh`,
    {
    withCredentials:true,
    }
    );
    
  } catch (error) {
    return error;
    
  }
  return response;

};

export const allUsers= async()=>{
  let response;
  try {
    response= await api.get(`${baseURL}/users`,
    {
      withCredentials:true,
    }
    );
    
  } catch (error) {

    return (error)
    
  }
  return response
}

export const allRestaurant= async()=>{
  let response;
  try {
    response= await api.get(`${baseURL}/restaurant`,
    {
      withCredentials:true,
    }
    )

    
  } catch (error) {
    return (error)
    
  }
  return response;
}

export const featuredRestaurant= async()=>{
  let response;
  try {
    response= await api.get(`${baseURL}/featuredRestaurant`,
    {
      withCredentials:true,
    }
    )
    
  } catch (error) {
    return (error)
    
  }
  return response
}

export const restaurantName=async(name) =>{
  let response;
  try {
    response= await api.get(`${baseURL}/restaurants/${name}`,
    {
      withCredentials:true,
    }
    )
    
  } catch (error) {
    return (error)
    
  }
  return response
}

export const newBooking=async(data)=>{
    let response;
  
    try {
      response = await api.post(`${baseURL}/booking`, data);
    } catch (error) {
      return error;
    }
  
    return response;
  };

export const bookings=async(id)=>{
  let response;
  try {
    response = await api.get(`${baseURL}/booking/${id}`);
  } catch (error) {
    return error;
  }

  return response;
};





