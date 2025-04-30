import styled from 'styled-components';
import {ButtonScheme, ButtonSize} from '../../style/theme';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size: ButtonSize;
  scheme: ButtonScheme;
  disabled?: boolean;
  isloading?: boolean;
}

const Button = ({
  children,
  size,
  scheme,
  disabled,
  isloading,
  ...rest // props를 한번에 넘기는 문법
}: Props) => {
  return (
    <ButtonStyle
      size={size}
      scheme={scheme}
      disabled={disabled}
      isloading={isloading}
      {...rest}>
      {children}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button<Omit<Props, 'children'>>`
  font-size: ${({theme, size}) => theme.button[size].fontSize};
  padding: ${({theme, size}) => theme.button[size].padding};
  color: ${({theme, scheme}) => theme.buttonScheme[scheme].color};
  background-color: ${({theme, scheme}) =>
    theme.buttonScheme[scheme].backgroundColor};
  border: 0;
  border-radius: ${({theme}) => theme.borderRadius.default};
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
  pointer-events: ${({disabled}) => (disabled ? 'none' : 'auto')};
  cursor: ${({disabled}) => (disabled ? 'default' : 'pointer')};
`;

export default Button;
