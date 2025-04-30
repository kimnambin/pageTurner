import styled from 'styled-components';
import useCategory from '../../hooks/useCategory';
import Button from '../common/Button';
import {useSearchParams} from 'react-router-dom';
import {QUERYSTRING} from '../../constants/querySting';
import React from 'react';

const Bookfilter = () => {
  const {category} = useCategory();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategory = (id: number | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (id === null) {
      newParams.delete(QUERYSTRING.CATEGORY_ID);
    } else {
      newParams.set(QUERYSTRING.CATEGORY_ID, id.toString());
    }

    setSearchParams(newParams);
  };

  const handleNews = () => {
    const newParams = new URLSearchParams(searchParams);
    if (newParams.get(QUERYSTRING.NEWS)) {
      newParams.delete(QUERYSTRING.NEWS);
    } else {
      newParams.set(QUERYSTRING.NEWS, 'true');
    }
    setSearchParams(newParams);
  };

  return (
    <BookfilterStyle>
      <div className="category">
        {category.map(item => (
          <Button
            size="medium"
            scheme={item.isActive ? 'primary' : 'normal'}
            key={item.category_id}
            onClick={() => handleCategory(item.category_id)}>
            {item.category_name}
          </Button>
        ))}
      </div>
      <div className="new">
        <Button
          size="medium"
          scheme={searchParams.get(QUERYSTRING.NEWS) ? 'primary' : 'normal'}
          onClick={handleNews}>
          신간
        </Button>
      </div>
    </BookfilterStyle>
  );
};

const BookfilterStyle = styled.div`
  display: flex;
  gap: 24px;

  .category {
    display: flex;
    gap: 8px;
  }
`;

export default Bookfilter;
