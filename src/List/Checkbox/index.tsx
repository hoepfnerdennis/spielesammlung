import React from 'react';
import styles from './styles.module.scss';

const Checkbox: React.SFC<{
  label: string;
  onChange: (value: boolean) => void;
  checked: boolean;
}> = ({ label, onChange, checked }): JSX.Element => {
  const handleClick = (): void => {
    onChange(!checked);
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
