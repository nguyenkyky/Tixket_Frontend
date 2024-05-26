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

  const renderData = {
    render:
      '<div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-4 items-start">   <div className="flex-shrink-0">     <img        src="https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2022/082022/Birthday_Popcorn_Box_350x495.png"       alt="Hộp Bắp Sinh Nhật CGV"      className="w-80 h-auto mx-auto md:mx-0"      />   </div>',
  };

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
