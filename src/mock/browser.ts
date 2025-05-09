import {setupWorker} from 'msw/browser';
import {addReview, reviewById, reviewForMain} from './review';
import {bestBooks} from './books';
// import {banners} from './banner';

const handlers = [reviewById, addReview, reviewForMain, bestBooks];

export const worker = setupWorker(...handlers);
