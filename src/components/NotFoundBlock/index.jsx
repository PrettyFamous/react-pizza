import styles from "./NotFoundBlock.module.scss";

console.log(styles);

export const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😒</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>
        К сожалению данная страница отстутствует в нашем интернет-магазине
      </p>
    </div>
  );
};
