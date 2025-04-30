// 카테고리 api를 가져오는 커스텀 훅

import {useEffect, useState} from 'react';
import {Category} from '../models/category.model';
import {fetchCategory} from '../api/category.api';
import {useLocation} from 'react-router-dom';

const useCategory = () => {
  const location = useLocation();
  const [category, setCategory] = useState<Category[]>([]);

  // URL의 쿼리 파라미터를 기반으로 특정 카테고리를 활성화하는 함수
  const setActive = (categories: Category[]) => {
    const params = new URLSearchParams(location.search);
    const categoryId = params.get('category_id');

    setCategory(() =>
      categories.map(item => ({
        ...item,
        isActive: item.category_id === (categoryId ? Number(categoryId) : null),
      })),
    );
  };

  useEffect(() => {
    fetchCategory().then(category => {
      if (!category) return;

      const categoryWithAll = [
        {category_id: null, category_name: '전체'},
        ...category,
      ];
      setCategory(categoryWithAll);
      setActive(categoryWithAll);
    });
  }, []);

  useEffect(() => {
    setActive(category);
  }, [location.search]);

  return {category};
};

export default useCategory;
