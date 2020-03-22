import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';

const Layer: React.SFC<{ children: React.ReactNode; closeLayer: () => void }> = ({
  children,
  closeLayer,
}): JSX.Element => {
  const root = useRef<HTMLElement | null>(document.getElementById('layer'));
  const container = useRef<HTMLDivElement>(document.createElement('div'));

  useEffect(() => {
    if (root.current) {
      const currentRoot = root.current;
      const currentContainter = container.current;
      currentRoot.appendChild(currentContainter);
      return (): void => {
        currentRoot.removeChild(currentContainter);
      };
    }
    return (): void => {
      // do nothing
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={styles.layer}>
      <button type="button" className={styles.background} onClick={closeLayer} />
      <div className={styles.container}>{children}</div>
    </div>,
    container.current
  );
};

export default Layer;
