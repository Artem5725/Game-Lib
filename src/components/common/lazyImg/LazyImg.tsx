import React, { useState, useRef, useEffect } from 'react';
import styles from './LazyImg.module.less';
import cn from 'classnames';

type Props = {
  src: string;
  alt?: string;
  customClassName?: string;
};

const LazyImg: React.FC<Props> = ({ src, alt, customClassName }) => {
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.onload = () => setLoaded(true);
    }
  }, []);

  return (
    <div className={cn(styles.wrapper, loaded && styles.wrapperLoaded)}>
      <img
        loading="lazy"
        ref={imageRef}
        className={cn(
          customClassName,
          styles.image,
          loaded && styles.imageLoaded
        )}
        src={src}
        alt={alt}
      />
    </div>
  );
};

export default React.memo(LazyImg);
