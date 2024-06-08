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
    <div
      style={{
        backgroundColor: "#FDFCF0",
        marginTop: "96px",
        paddingTop: "60px",
      }}
      dangerouslySetInnerHTML={{ __html: data }}
    >
      {/* <div class="max-w-6xl mx-auto p-6 flex flex-col md:flex-col gap-4 items-start">
        <div class="text-red-500 text-2xl mb-6">
          U22 - TRẢI NGHIỆM VƯỢT XA ĐIỆN ẢNH
        </div>
        <img src="https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/u22/body-2-2024-4.png" />
        <img src="https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/u22/body-3-2024-2.png" />
        <img src="https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/u22/body-4-2024-5.png" />
        <img src="https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/u22/body-5-2024-2.png" />
      </div> */}
    </div>
  );
}

export default News;
