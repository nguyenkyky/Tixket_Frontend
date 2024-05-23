import axios from "axios";
import { DOMAIN } from "../../util/settings/config";
import { quanLyPhimService } from "../../services/QuanLyPhimService";

export const getCarouselAction = async (dispatch) => {
  try {
    const result = await quanLyPhimService.layDanhSachBanner();
    // console.log("result", result);
    dispatch({
      type: "SET_CAROUSEL",
      arrImg: result.data.data,
    });
  } catch (errors) {
    console.log("errors", errors);
  }
};

export const saveDanhSachBannerAction = (data) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.saveDanhSachBanner(data);
      dispatch(getCarouselAction);
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};
