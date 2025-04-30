import styled from 'styled-components';
import {ColorKey, HeadingSize} from '../../style/theme';

interface Props {
  children: React.ReactNode;
  size: HeadingSize;
  color?: ColorKey;
}

const Title = ({children, size}: Props) => {
  return <TitleStyle size={size}>{children}</TitleStyle>;
};

// Omit => props에서 children을 제외하고 사용하겠다.
const TitleStyle = styled.h1<Omit<Props, 'children'>>`
  font-size: ${({theme, size}) => theme.heading[size].fontSize};
  color: ${({theme, color}) =>
    color ? theme.color[color] : theme.color.primary};
`;

export default Title;
