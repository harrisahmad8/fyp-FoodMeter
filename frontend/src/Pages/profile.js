import React, { useEffect, useState } from 'react';
import '../CSS/profile.css';
import { Navbar } from '../Components/Navbar';
import { Footer } from '../Components/Footer';
import { UpdateProfile } from '../api/internal';
import { useSelector } from 'react-redux';
import { getUser } from '../api/internal';

export const Profile = () => {
  const id= useSelector((state) => state.user._id);
  const user=useSelector((state)=>state.user);
  const {reload,SetReload}=useState(false)
  console.log(user)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState('');
  const [userDetails,SetUserDetails]=useState();
  useEffect(() => {
    (async function fetchData() {
     
     const Userget = await getUser(id);
     if (Userget.status === 200) {
       SetUserDetails(Userget.data.user);
       console.log("Feature Restaurant Data:", Userget.data.user);
       setEmail(Userget.data.user.email)
       setName(Userget.data.user.name)
       setPhoneNumber(Userget.data.user.number)
       setPassword(Userget.data.user.password)
     }
   })();
 }, [reload]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateDetails = async() => {
const data={
  name:name,
  password:password,
  email:email,
  number:phoneNumber
};
const response=await UpdateProfile(data,id)
if(response.status===201){
  alert("profileUpdated!")
  
}
    handleCloseModal();
    
  };
  const handleUpdateProfilePicture = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setProfilePicture(e.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
    <div className='page'>
    <div className="layout">
        <Navbar />
        <div className="user-profile-container">
      <div className="user-profile-card">
        <div className="user-profile-picture">
          <img src={profilePicture} alt="Profile" />
          <input type="file" accept="image/*" onChange={handleUpdateProfilePicture} />
        </div>
        {userDetails &&(<div><h2 className="user-profile-name">{name}</h2>
        <p className="user-profile-email">Email: {email}</p>
        <p className="user-profile-phone">Phone Number:{phoneNumber}</p>
        <p className="user-profile-password">Password:"********</p>
        <button className="update-details-button" onClick={handleOpenModal}>
          Update Details
        </button></div>)}
      </div>

      {isModalOpen && (
        
        <div className="modal">
          <div className="modal-content">
            <h2>Update Details</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="modal-update-button" onClick={handleUpdateDetails}>
              Update
            </button>
            <button className="modal-close-button" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
    <Footer/>
    </div>
    </>
  );
};

