import React from 'react';
import styles from "./Screenshot.module.less";

type Props = {
  screenUrl: string;
};

const Screenshot: React.FC<Props> = ({ screenUrl }) => <img loading="lazy" className={styles.screenshot} src={screenUrl} alt="Screenshot" />;

export default React.memo(Screenshot);
