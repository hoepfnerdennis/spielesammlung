import React, { Fragment } from 'react';
import styles from './styles.module.css';
import { chunkArray } from '../utils';

const Item: React.SFC<{
  icon: string;
  name: string;
  desc: string;
  condition?: boolean;
}> = ({ icon, name, desc, condition = true }) => {
  if (!condition) {
    return null;
  }
  return (
    <p className={styles.players}>
      <span role="img" aria-label={name}>
        {icon}
      </span>
      <b className={styles.highlight}>{desc}</b>
    </p>
  );
};

const List: React.SFC<{
  children: Array<JSX.Element>;
}> = ({ children }) => {
  const filteredChildrenByCondition = children.filter(
    (child) => child.props.condition === undefined || child.props.condition === true
  );
  const chunks = chunkArray<JSX.Element>(filteredChildrenByCondition, 3);
  return (
    <div className={styles.container}>
      {chunks.map((chunk) => (
        <div key={chunk.map((child) => child.props.name).join('_')} className={styles.box}>
          {chunk.map((child) => (
            <Fragment key={child.props.name}>{child}</Fragment>
          ))}
        </div>
      ))}
    </div>
  );
};

export default {
  List,
  Item,
};
