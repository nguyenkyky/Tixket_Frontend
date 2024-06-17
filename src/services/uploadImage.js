import axios from "axios";

export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "tl6oxwji"); // Thay bằng tên preset thực tế của bạn

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dxjggmi5c/image/upload",
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tải ảnh lên: ", error);
    throw error;
  }
};
