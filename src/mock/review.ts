import {HttpResponse, http} from 'msw';
import {BookReviewItem} from '../models/book.model';
import {fakerKO as faker} from '@faker-js/faker';

const reviewData: BookReviewItem[] = Array.from({length: 8}).map((_, idx) => ({
  id: idx,
  userName: `${faker.person.lastName()}${faker.person.firstName()}`,
  content: faker.lorem.paragraph(),
  createdAt: faker.date.past().toISOString(),
  score: faker.helpers.rangeToNumber({min: 1, max: 5}),
}));

export const reviewById = http.get(
  'http://localhost:7777/reviews/:bookId',
  () => {
    return HttpResponse.json(reviewData, {
      status: 200,
    });
  },
);

export const addReview = http.post(
  'http://localhost:7777/reviews/:bookId',
  () => {
    return HttpResponse.json(
      {
        message: '리뷰가 등록되었습니다',
      },
      {
        status: 200,
      },
    );
  },
);

export const reviewForMain = http.get('http://localhost:7777/reviews', () => {
  return HttpResponse.json(reviewData, {
    status: 200,
  });
});
