// @flow
import React, { Component } from 'react';
import firebase, { Reference } from 'react-native-firebase';
import GeoFire from 'geofire';

type Props = {
  userId: null | string,
};

class LocationTracker extends Component<Props> {
  static defaultProps = {
    userId: null,
  };

  watchId: number;
  geoRef: GeoFire;
  nodeRef: Reference;

  componentDidMount() {
    const { userId } = this.props;
    if (userId === null) {
      throw new Error('Write path is missing on LocationTracker');
    }

    this.nodeRef = firebase.database().ref('driversPositions');
    this.geoRef = new GeoFire(this.nodeRef);
    this.startTracking();
  }

  componentWillUnmount() {
    this.stopTracking();
  }

  startTracking = () => {
    const options = {
      distanceFilter: 100,
      enableHighAccuracy: true,
      maximumAge: 15000,
      timeout: 25000,
      useSignificantChanges: true,
    };

    this.watchId = navigator.geolocation.watchPosition(
      this.onTracking,
      this.onError,
      options
    );
  };

  stopTracking = () => {
    navigator.geolocation.clearWatch(this.watchId);

    if (this.props.userId !== null) {
      this.nodeRef.child(this.props.userId).remove();
    }
  };

  onTracking = (position: Position) => {
    this.geoRef.set(this.props.userId, [
      position.coords.latitude,
      position.coords.longitude,
    ]);
  };

  onError = (error: PositionError) => {
    console.warn(error.message);
  };

  render() {
    return null;
  }
}

export default LocationTracker;