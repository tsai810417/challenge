import { get } from "lodash";
import moment from "moment";
import React, { useState } from "react";
import { useQuery } from "react-apollo";
import { useParams } from "react-router";
import { DEVICE_POSITIONS } from "../queries";
import Map from "../components/Map";

export default function DeviceDetail() {
  const [selectedDate, setSelectedDate] = useState(null);
  const { deviceId } = useParams();
  const { data } = useQuery(DEVICE_POSITIONS, {
    variables: { deviceId: Number(deviceId) }
  });
  const positions = get(data, ["allPositions", "nodes"], []);
  const dailyTrack = {};
  positions.forEach(p => {
    const date = moment(p.positionAt).format("YYYY-MM-DD");
    if (!dailyTrack[date]) dailyTrack[date] = [];
    dailyTrack[date].push(p);
  })

  return (
    <div className="col-12">
      <h1>Device Path</h1>
      <div className="col-12">
      <ul style={{listStyle: "none", display: "flex", flexWrap: "wrap"}}>
        {Object.keys(dailyTrack).map((date, idx) => (
          <li key={idx} style={{margin: 5}}>
            <button onClick={() => setSelectedDate(date)}>{date}</button>  
          </li>
        ))}
      </ul>
      </div>
      {selectedDate ? (
        <div className="col-12">
          <h2>Path On: {selectedDate}</h2>
          <Map path={dailyTrack[selectedDate]} />
        </div>
      ) : null}
    </div>
  )
}