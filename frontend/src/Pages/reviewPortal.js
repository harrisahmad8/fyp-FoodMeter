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
import { CommentList } from "../Components/commentList/commentList";
import { Rate } from "antd";

export const ReviewPortal = () => {
  const [restaurantData, SetRestaruantData] = useState([]);
  const [comments, SetComments] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [comment, SetComment] = useState("");
  const [reload, setReload] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0.0);
  const location = useLocation();
  console.log("receivedData", location);
  const navigate = useNavigate();
  const restid = location.state?.restaurant || "No data received";
  const userId = useSelector((state) => state.user._id);

  const totalRating = comments.reduce((acc, comment) => acc + comment.rating, 0);
  const averageRating = totalRating / comments.length;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    (async function fetchData() {
      const id = location.state?.restaurant || "No data received";
      const getUser = await restaurantById(id);
      if (getUser.status === 200) {
        SetRestaruantData(getUser.data.restaurant);
      }
      const commentResponse = await getComments(id);
      if (commentResponse.status === 200) {
        SetComments(commentResponse.data.data);
      }
    })();
    SetLoading(false);
  }, [reload]);

  const addUserComment = async () => {
    if (!selectedRating) {
      setIsModalOpen(true);
      return;
    }
    const data = {
      content: comment,
      restaurant: restid,
      user: userId,
      rating: selectedRating,
    };
    const response = await postComment(data);
    if (response.status === 201) {
      SetComment("");
      setSelectedRating(0);
      setReload(!reload);
      setIsModalOpen(false);
    }
  };

  const showGoodComments = () => {
    const goodCommentsArray = comments.filter(comment => comment.rating > 2.5);
    SetComments(goodCommentsArray);
  };

  const showBadComments = () => {
    const badCommentsArray = comments.filter(comment => comment.rating <= 2.5);
    SetComments(badCommentsArray);
  };
  
  const RatingModal = () => {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-75 z-50 flex justify-center items-center">
        <div className="bg-white rounded-md p-5 shadow-md">
          <h2 className="text-xl font-bold mb-3">Rate this restaurant</h2>
          <Rate
            value={selectedRating}
            onChange={(value) => setSelectedRating(value)}
            allowHalf
            tooltips={["very bad","bad","satisfactory","good","excellent"]}
            
          />
          <div className="flex justify-end mt-5">
            <button
              className="bg-blue-700 px-3 py-1 rounded-md mr-3"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 px-3 py-1 rounded-md text-white"
              onClick={() => addUserComment()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="bg-white flex flex-col">
      <Navbar />
      <div className={styles.layout}>
        <div style={{ marginBottom: 50 }} className={styles.main}>
          <div className="mb-5 text-2xl font-bold text-black">
            <h1>{restaurantData.name}</h1>
          </div>
          <hr className="h-[2px] bg-gray-700 mb-10"></hr>
          <div className="flex space-x-3">
            <div className={styles.ratingBox}>
              <h2 className="font-semibold">Food Meter Rating</h2>
              <p className="text-yellow-500 font-bold">
                {restaurantData.systemRating ? (
                  <div className=" flex items-center space-x-2 pl-15 justify-center">
                    <Rate
                      value={restaurantData.systemRating}
                      disabled
                      allowHalf
                    />
                    <span>{restaurantData.systemRating.toFixed(1)}</span>
                  </div>
                ) : (
                  <p> No System Rating</p>
                )}
              </p>
            </div>
            <div className={styles.ratingBox}>
              <h2 className="font-semibold">User Rating</h2>
              <p className="text-yellow-500 font-bold">
              {comments.length > 0 ? (
    <div className="flex items-center space-x-2 pl-15 justify-center">
      <Rate value={averageRating} disabled allowHalf />
      <span>{averageRating.toFixed(1)}</span>
    </div>
  ) : (
    <p>No user ratings yet</p>
  )}
              </p>
            </div>
            <div className={styles.graphBox}>
              {/* Bar graph component */}
              {/* You can use a chart library like Chart.js here */}
              <div>
                <button
                  className="bg-green-700 h-40 w-60 hover:bg-slate-600 border-spacing-4  text-black rounded-md shadow-md"
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
          <div className="flex mt-10 h-[200px] rounded-xl bg-gray-100">
            <div className=" w-[40%] rounded-sm">
              <img
                className="object-cover w-full h-full rounded-xl"
                src={restaurantData.logoPath}
                alt=""
              />
            </div>
            {/* details section */}
            <div className="w-[60%] p-5">
              <div className="w-[80%] mx-auto">
                <p className="font-semibold text-2xl text-gray-800">
                  {restaurantData.name}
                </p>

                <p className="text-justify mt-5 ">{restaurantData.foodType}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 justify-center items-center">
          <div className="flex mx-auto justify-center space-x-5 p-20">
            {/* section 1 */}
            <div
              style={{ background: "white" }}
              className={[styles.commentsBox]}
            >


<button onClick={showGoodComments}>Good Comments</button>
            <button onClick={showBadComments}>Bad Comments</button>


              <h2>Scraped Comments</h2>
              <hr className="h-[2px] bg-gray-700 mb-10"></hr>
              <ul>
                {restaurantData.systemComments?.map((comment, index) => (
                  <>
                    <li key={index}>
                    <span className="text-yellow-400 font-bold mr-3 ">
                        {comment.rating ? (
                          <div>
                            <Rate value={comment.rating} disabled allowHalf style={{ fontSize: "16px" }} />
                            <span>{comment.rating.toFixed(1)}</span>
                          </div>
                        ) : (
                          <div className="text-gray-800">No system rating</div>
                        )}
                      </span>
                      <p className="text-sm py-1 text-left">{comment.content}{" "}</p>
                      
                    </li>
                    <hr className="h-[1px] bg-black mb-10"></hr>
                  </>
                ))}
              </ul>
            </div>
            {/* section 2 */}
            <div style={{ background: "white" }} className={styles.commentsBox}>
              <h2>User Comments</h2>
              <hr className="h-[2px] bg-gray-700 mb-10"></hr>
              <CommentList comments={comments} />
              <div className={styles.postComment}>
                <input
                  className={styles.input}
                  placeholder="comment goes here..."
                  value={comment}
                  onChange={(e) => SetComment(e.target.value)}
                />
                <button
                  className="p-1 w-[100%] text-white bg-gray-800 mt-5"
                  onClick={addUserComment}
                  disabled={comment.length===0}
                >
                  Post
                </button>
                {isModalOpen && <RatingModal />}

              </div>
            </div>
          </div>
        </div>
      </div>
    <Footer/>
    </div>
  );
};

