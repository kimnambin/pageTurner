import dayjs from 'dayjs';

export const formatNumber = (num: number | null | undefined): string => {
  if (num === null || num === undefined) {
    return '0'; // 또는 다른 기본값
  }
  return num.toLocaleString();
};

export const formatDate = (date: string, format?: string) => {
  return dayjs(date).format(format ? format : 'YYYY년 MM월 DD일');
};
