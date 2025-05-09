import {httpClient} from './http';

export const fetchBanners = async () => {
  const res = await httpClient.get('/banners');

  return res.data.documents;
};
