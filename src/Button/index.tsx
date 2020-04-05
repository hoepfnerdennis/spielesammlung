import React from 'react';
import { useFela } from 'react-fela';
import { IStyle } from 'fela';

const buttonStyle = (secondary?: boolean) => (): IStyle => ({
  height: '2rem',
  fontSize: '1rem',
  border: '2px solid darkcyan',
  borderRadius: '5px',
  padding: '0 1rem',
  whiteSpace: 'nowrap',
  backgroundColor: secondary ? 'white' : 'darkcyan',
  color: secondary ? 'darkcyan' : 'white',
});

const Button: React.SFC<React.PropsWithChildren<{ secondary?: boolean; onClick: () => void }>> = ({
  children,
  secondary,
  onClick,
}): JSX.Element => {
  const { css } = useFela();
  return (
    <button type="button" className={css(buttonStyle(secondary))} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
