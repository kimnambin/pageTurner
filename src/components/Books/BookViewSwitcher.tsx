import styled from 'styled-components';
import Button from '../common/Button';
import {FaList, FaTh} from 'react-icons/fa';
import {useSearchParams} from 'react-router-dom';
import {QUERYSTRING} from '../../constants/querySting';
import {useEffect} from 'react';

const viewOptions = [
  {
    value: 'list',
    icon: <FaList />,
  },
  {
    value: 'grid',
    icon: <FaTh />,
  },
];

export type ViewMode = 'grid' | 'List';

const BookViewSwitcher = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSwitch = (value: string) => {
    const newSeachParams = new URLSearchParams(searchParams);

    newSeachParams.set(QUERYSTRING.VIEW, value);
    setSearchParams(newSeachParams);
  };

  useEffect(() => {
    if (!searchParams.get(QUERYSTRING.VIEW)) {
      handleSwitch('grid');
    }
  }, []);

  return (
    <BookViewSwitcherStyle>
      {viewOptions.map(v => (
        <Button
          key={v.value}
          onClick={() => handleSwitch(v.value as ViewMode)}
          size="medium"
          scheme={
            searchParams.get(QUERYSTRING.VIEW) === v.value
              ? 'primary'
              : 'normal'
          }>
          {v.icon}
        </Button>
      ))}
    </BookViewSwitcherStyle>
  );
};

const BookViewSwitcherStyle = styled.div`
  display: flex;
  gap: 8px;

  svg {
    fill: white;
  }
`;

export default BookViewSwitcher;
