import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://fczqbx2rci.execute-api.ap-northeast-2.amazonaws.com',
  headers: {
    'Content-Type': `application/json;charset=UTF-8`,
    Accept: 'application/json',
    'Access-Control-Allow-Origin': `*`,
    'Access-Control-Allow-Credentials': 'true',
  },
});

export const getBlogs = async () => {
  try {
    const res = await client.get(`/blogs`);

    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getBlog = async (post_id: string) => {
  try {
    const res = await client.get(`/blog?postId=${post_id}`);

    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
