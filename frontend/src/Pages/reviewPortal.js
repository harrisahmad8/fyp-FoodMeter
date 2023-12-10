import React, { useState, useEffect } from "react";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import styles from "../CSS/review.module.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { restaurantById } from "../api/internal";
import { Loader } from "../Components/Loader/Loader";
import { getComments } from "../api/internal";
import { postComment } from "../api/internal";
import { useSelector } from "react-redux";
import { Comment } from "../Components/Comment/comment";
import { CommentList } from "../Components/commentList/commentList";
export const ReviewPortal = () => {
  const [restaurantData, SetRestaruantData] = useState([]);
  const [comments,SetComments]=useState([])
  const [loading, SetLoading] = useState(true);
  const [comment,SetComment]=useState("")
  const [reload,setReload]=useState(false)
  const location = useLocation();
  console.log("recievedData", location);
  const navigate = useNavigate();
  const restid = location.state?.restaurant || "No data received";
  const userId= useSelector((state) => state.user._id);
  useEffect(() => {
    (async function fetchData() {
      const id = location.state?.restaurant || "No data received";
      console.log(id);

      const getUser = await restaurantById(id);
      if (getUser.status === 200) {
        SetRestaruantData(getUser.data.restaurant);
        console.log("Feature Restaurant Data:", getUser.data.restaurant);
        console.log("restaurant", restaurantData);
      }
      const commentResponse = await getComments(id);
      if (commentResponse.status === 200) {
        SetComments(commentResponse.data.data);
      }
    })();
    console.log("restaurant", restaurantData);
    SetLoading(false);
  }, [reload]);
  const addUserComment =async () => {
   const data={
    content:comment,
    restaurant:restid,
    user:userId
   };
   const response= await postComment(data);
   if(response.status===201){
    SetComment("")
    setReload(!reload)
   }
    
  };
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={styles.header}>
            <h1>{restaurantData.name}</h1>
          </div>
          <div className={styles.ratingSection}>
            <div className={styles.ratingBox}>
              <h2>Food Meter Rating</h2>
              <p>{restaurantData.systemRating}</p>
            </div>
            <div className={styles.ratingBox}>
              <h2>User Rating</h2>
              <p>{restaurantData.userRating}</p>
            </div>
            <div className={styles.graphBox}>
              {/* Bar graph component */}
              {/* You can use a chart library like Chart.js here */}
            </div>
          </div>
          <div className={styles.commentsSection}>
            <div className={styles.commentsBox}>
              <h2>Scraped Comments</h2>

              <ul>
                {restaurantData.systemComments?.map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
              </ul>
            </div>
            <div className={styles.commentsBox}>
              <h2>User Comments</h2>
              <CommentList comments={comments}/>
              <div className={styles.postComment}>
            <input
              className={styles.input}
              placeholder="comment goes here..."
              value={comment}
              onChange={(e) => SetComment(e.target.value)}
            />
            <button
              className={styles.postCommentButton}
              onClick={addUserComment}
            >
              Post
            </button>
          </div>
            </div>
            <div>
              <button
                onClick={() =>
                  navigate("/booking", {
                    state: { restaurantId: restaurantData._id },
                  })
                }
              >
                Reserve a Table
              </button>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};
