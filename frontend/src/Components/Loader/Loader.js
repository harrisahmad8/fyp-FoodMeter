
import styles from "./Loader.module.css"

 export const Loader =({ text })=>  {
  return (
    <div className={styles.loaderOverlay}>
    <div className={styles.loaderWrapper}>
      
     
      <h2>Loading {text}</h2>
    </div>
  </div>
  );
}
