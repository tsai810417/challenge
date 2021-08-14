import React from 'react';
import get from 'lodash.get';
import { withDeviceLocations } from '../queries';
import Map from '../components/Map';

import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';

const SuperDevice = (props) => (
  <div className="container">
    <div style={{ marginBottom: 300 }}>
      <div>
        lat,lng
      </div>
    </div>
    <div className="col-12">
      <Map devices={get(props, ['data', 'allDevices', 'nodes'], [])} />
    </div>
  </div>
);

const Devices = (props) => {
  const devices = get(props, ['data', 'allDevices', 'nodes'], []);

  return (
    <div>
      <h1>List of Devices</h1>
      <ul>
        {devices.map(device => (
          <li key={device.id}>
            <Link to={`/devices/${device.id}`}>
              {device.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="col-12">
        <Map devices={devices} />
      </div>
    </div>
  );
}

export default withDeviceLocations(Devices);
