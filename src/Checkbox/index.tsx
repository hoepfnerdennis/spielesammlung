import React from 'react';
import styles from './styles.module.scss';

const Checkbox: React.SFC<{
  label: string;
  onChange: (value: string | undefined) => void;
  checked: boolean;
}> = ({ label, onChange, checked }): JSX.Element => {
  const handleClick = (): void => {
    onChange(!checked ? 'true' : undefined);
  };

  return (
    <button
      type="button"
      className={checked ? styles.checked : styles.unchecked}
      onClick={handleClick}>
      {label}
    </button>
  );
};

export default Checkbox;
