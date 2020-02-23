import React from 'react';
import { Skeleton } from 'antd';

class PreLoadComponent extends React.Component {
  render() {
    return (
      <Skeleton
        loading
        active
        avatar
      />
    );
  }
}

export default PreLoadComponent;
