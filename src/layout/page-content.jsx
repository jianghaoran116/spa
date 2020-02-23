import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect(
  state => state.leftMenuTree.toJS(),
  null,
)
class PageContent extends Component {
  render() {
    return (
      <div>
        {
          this.props.dyComponent
            ? <this.props.dyComponent />
            : null
        }
      </div>
    );
  }
}

export default PageContent;
