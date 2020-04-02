import React from 'react';
import Button from '../ Button';

const Checkbox: React.SFC<{
  label: string;
  onChange: (value: string | undefined) => void;
  checked: boolean;
}> = ({ label, onChange, checked }): JSX.Element => {
  const handleClick = (): void => {
    onChange(!checked ? 'true' : undefined);
  };

  return (
    <Button secondary={!checked} onClick={handleClick}>
      {label}
    </Button>
  );
};

export default Checkbox;
