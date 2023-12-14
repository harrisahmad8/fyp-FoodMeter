import styles from "./Comment.module.css"
import { Rate } from "antd";
export const Comment=({comment})=>{
    const date=new Date(comment.createdAt).toDateString();
return(
    <div className={styles.comment}>
    <div className={styles.header}>
      <div className={styles.author}>{comment.user}<span className="mt-2 ml-2"><Rate
                      value={comment.rating}
                      style={{ fontSize: "16px" }}
                      disabled
                      allowHalf
                    /></span><span className="text-yellow-400 font-bold ml-2 t">{comment.rating}</span>
                    </div>
      <div className={styles.date}>{date}</div>
      <div className={styles.commentText}>{comment.content}</div>
    </div>
  </div>
);
}
