import styles from './styles.module.scss';

export const Form = () => {
  return (
    <div className={styles.form}>
      <input type="text" />
      <button>Load issues</button>
    </div>
  );
};
