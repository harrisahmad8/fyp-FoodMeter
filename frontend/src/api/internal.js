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
  console.log("****",name)
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
  console.log('response: ',response)
  return response
}

export const restaurantById=async(id) =>{
  let response;
  try {
    response= await api.get(`${baseURL}/restaurant/${id}`,
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
export const getComments=async(id)=>{
  let response;
  try {
    response = await api.get(`${baseURL}/comment/${id}`);
  } catch (error) {
    return error;
  }

  return response;
};

export const postComment = async (data) => {
  let response;

  try {
    response = await api.post("/comment", data);
  } catch (error) {
    return error;
  }
  return response;
};

export const UpdateProfile=async(data,id)=>{
  let response;

  try {
    response = await api.put(`${baseURL}/updateProfile/${id}`, data);
  } catch (error) {
    return error;
  }
  return response;
};
export const getUser=async(id)=>{
  let response;

  try {
    response = await api.get(`${baseURL}/user/${id}`);
  } catch (error) {
    return error;
  }
  return response;
};

export const getStripeApiKey = async () => {
  try {
      const response = await axios.get(`${baseURL}/stripe_api_key`)
      // console.log("Response :", response.data)
      return response;
  }
  catch (error) {
      throw error;
  }
};

// process payment
export const processPayment = async () => {
  try {
      const response = await axios.post(`${baseURL}/process_payment`);
      console.log("Response :", response.data)
      return response;
  }
  catch (error) {
      throw error;
  }
};

export const makeFeatured=async(name)=>{
  console.log(name)
  let response;

  try {
    response = await api.put(`${baseURL}/makeFeatured/${name}`);
  } catch (error) {
    return error;
  }
  return response;
};

export const topRated=async()=>{
  let response;

  try {
    response = await api.get(`${baseURL}/topRated`);
  } catch (error) {
    return error;
  }
  return response;
};

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalReq = error.config;

    // extract the value of message from json response if it exists
    const errorMessage = error.response && error.response.data && error.response.data.message;

    if (
      errorMessage === 'Unauthorized' &&
			(error.response.status === 401 || error.response.status === 500) &&
			originalReq &&
			!originalReq._isRetry
    ) {
      originalReq._isRetry = true;

      try {
        await axios.get(`${process.env.REACT_APP_INTERNAL_API_PATH}/refresh`, {
          withCredentials: true,
        });

        return api.request(originalReq);
      } catch (error) {
        return error;
      }
    }
    throw error;
  }
);


