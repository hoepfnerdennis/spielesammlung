import React from 'react';
import styles from './styles.module.scss';

const Button: React.SFC<React.PropsWithChildren<{ secondary?: boolean; onClick: () => void }>> = ({
  children,
  secondary,
  onClick,
}): JSX.Element => {
  return (
    <button type="button" className={secondary ? styles.stroke : styles.filled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
