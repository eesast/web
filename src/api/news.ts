import axios from "axios";

export interface NewsSlide {
  image: string;
  title: string;
  content: string;
  link: string;
}

// 获取清华大学电子工程系“图片新闻”的最新两条，用于首页轮播新增的成员
export const getImageNews = async (): Promise<NewsSlide[]> => {
  try {
    const response = await axios.get<NewsSlide[]>("/news/image");
    if (!Array.isArray(response.data)) return [];
    return response.data.filter(
      (slide) => slide && slide.image && slide.title && slide.link,
    );
  } catch (err) {
    console.log(err);
    return [];
  }
};
