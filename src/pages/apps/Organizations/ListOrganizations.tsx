import axios from "axios";
import { log } from "console";
import React, { useEffect } from "react";

function ListOrganizations() {
  const connect = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/health");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={connect}>Click</button>
    </div>
  );
}

export default ListOrganizations;
