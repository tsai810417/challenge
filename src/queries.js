import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const USER = gql`
  query User {
    me {
      id
      name
      email
    }
  }
`;

export const withUser = graphql(USER);

export const DEVICE_LOCATIONS = gql`
  query DeviceLocations {
    allDevices {
      nodes {
        id
        name
        batteryPercentage
        positionsByDeviceId(first: 1, orderBy: POSITION_AT_DESC) {
          nodes {
            id
            positionAt
            latitude
            longitude
            address
          }
        }
      }
    }
  }
`;

export const withDeviceLocations = graphql(DEVICE_LOCATIONS);
