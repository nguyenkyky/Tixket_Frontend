import React, { useEffect, useState } from "react";
import { quanLyTinTucService } from "../../services/QuanLyTinTucService";
import { useParams } from "react-router-dom";

function News(props) {
  const [data, setData] = useState("");
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    async function getData() {
      const data = await quanLyTinTucService.getData(id);
      console.log(data.data);
      setData(data.data.render);
    }
    getData();
  }, []);

  return (
    <div>
      <div
        style={{
          backgroundColor: "#FDFCF0",
          marginTop: "96px",
          paddingTop: "60px",
        }}
        dangerouslySetInnerHTML={{ __html: data }}
      ></div>
    </div>
  );
}

export default News;
