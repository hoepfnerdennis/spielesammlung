import React, { useCallback, memo } from 'react';
import styles from './styles.module.css';

type SelectProps = {
  values: Array<string>;
  onChange: (value: string) => void;
  label: string;
  valueSuffix?: string;
};

const Select: React.SFC<SelectProps> = ({ label, onChange, values, valueSuffix }): JSX.Element => {
  const handleChange = useCallback(
    event => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <label htmlFor={label} className={styles.container}>
      {label}
      <select name={label} id={label} onChange={handleChange} className={styles.selectbox}>
        <option value="">alle</option>
        {values.map(value => (
          <option key={value} value={value}>
            {value}
            {valueSuffix && ` ${valueSuffix}`}
          </option>
        ))}
      </select>
    </label>
  );
};

export default memo(Select, (pp, np) => pp.values === np.values);
