declare namespace Geo {
  interface Location {
    latitude: number;
    longitude: number;
  }

  interface LocationShort {
    lat: number;
    lng: number;
  }

  interface Region extends Location {
    latitudeDelta: number;
    longitudeDelta: number;
  }
}
