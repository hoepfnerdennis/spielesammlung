import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';

const Layer: React.SFC<{ children: React.ReactNode; closeLayer: () => void }> = ({
  children,
  closeLayer,
}): JSX.Element => {
  const root = useRef<HTMLElement>(document.body);
  const container = useRef<HTMLDivElement>(document.createElement('div'));

  useEffect(() => {
    const currentRoot = root.current;
    const currentContainter = container.current;
    currentRoot.appendChild(currentContainter);
    return (): void => {
      currentRoot.removeChild(currentContainter);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={styles.layer}>
      <button
        aria-label="layer schließen"
        type="button"
        className={styles.background}
        onClick={closeLayer}
      />
      <div className={styles.container}>{children}</div>
    </div>,
    container.current
  );
};

export default Layer;
