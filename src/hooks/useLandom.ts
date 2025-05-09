import {useEffect, useState} from 'react';
import {Banner} from '../models/banner.model';
import {fetchBanners} from '../api/banner.api';

const useLandom = () => {
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        const item = await fetchBanners();
        setBanners(item);
      } catch (err) {
        console.error(err);
      }
    };

    loadBanners();
  }, []);

  console.log(banners);
  return {banners};
};

export default useLandom;
