import {Category} from '../models/category.model';
import {httpClient} from './http';

export const fetchCategory = async () => {
  const res = await httpClient.get<Category[]>('/category');
  return res.data;
};
