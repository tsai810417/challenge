import React, { Component } from 'react';
import get from 'lodash.get';
import { withDeviceLocations } from '../queries';
import Map from '../components/Map';

class Devices extends Component {
  render() {
    return (
      <div className="container">
        <div className="col-12">
          <Map devices={get(this.props, ['data', 'allDevices', 'nodes'], [])} />
        </div>
      </div>
    );
  }
}

export default withDeviceLocations(Devices);
