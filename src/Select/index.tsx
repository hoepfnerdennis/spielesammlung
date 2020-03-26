import React, { useCallback, memo } from 'react';
import styles from './styles.module.css';

type SelectProps = {
  values: Array<string>;
  value: string;
  onChange: (value: string | undefined) => void;
  label: string;
  valueSuffix?: string;
};

const Select: React.SFC<SelectProps> = ({
  label,
  onChange,
  values,
  valueSuffix,
  value,
}): JSX.Element => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (event.target.value.length > 0) {
        onChange(event.target.value);
      } else {
        onChange(undefined);
      }
    },
    [onChange]
  );

  return (
    <label htmlFor={label} className={styles.container}>
      {label}
      <select
        name={label}
        id={label}
        onChange={handleChange}
        className={styles.selectbox}
        value={value}>
        <option value="">alle</option>
        {values.map(v => (
          <option key={v} value={v}>
            {v}
            {valueSuffix && ` ${valueSuffix}`}
          </option>
        ))}
      </select>
    </label>
  );
};

export default memo(
  Select,
  (pp, np) => pp.values.join() === np.values.join() && pp.value === np.value
);
