import {styled} from 'styled-components';
import {
  FaAngleRight,
  FaBars,
  FaRegUser,
  FaSignInAlt,
  FaUserCircle,
} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import useCategory from '../../hooks/useCategory';
import {useAuthStore} from '../../store/authStore';
import {useState} from 'react';
import Dropdown from './Drowdown';
import logo from '../../assets/images/logo.png';

const Headers = () => {
  const {category} = useCategory();
  const {isloggedIn, storeLogout} = useAuthStore();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <HeaderStyle $isOpen={isMobileOpen}>
      <h1 className="logo">
        <Link to="/">
          <img src={logo} alt="book store" />
        </Link>
      </h1>
      <nav className="category">
        <button
          className="menu-button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <FaAngleRight /> : <FaBars />}
        </button>
        <ul>
          {category.map(item => (
            <li key={item.category_id}>
              <Link
                to={
                  item.category_id === null
                    ? `/books`
                    : `/books?category_id=${item.category_id}`
                }>
                {item.category_name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="auth">
        <Dropdown toggleButton={<FaUserCircle />}>
          <>
            {isloggedIn && (
              <ul>
                <li>
                  <Link to="/cart">장바구니</Link>
                </li>
                <li>
                  <Link to="/orderlist">주문 내역</Link>
                </li>
                <li>
                  <button onClick={storeLogout}>로그아웃</button>
                </li>
              </ul>
            )}
            {!isloggedIn && (
              <ul>
                <li>
                  <Link to="/login">
                    <FaSignInAlt />
                    로그인
                  </Link>
                </li>
                <li>
                  <Link to="/signup">
                    <FaRegUser />
                    회원가입
                  </Link>
                </li>
              </ul>
            )}
          </>
        </Dropdown>
      </nav>
    </HeaderStyle>
  );
};

interface HeaderStyleProps {
  $isOpen: boolean;
}

const HeaderStyle = styled.header<HeaderStyleProps>`
  width: 100%;
  margin: 0 auto;
  max-width: ${({theme}) => theme.layout.width.large};

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${({theme}) => theme.color.background};

  .logo {
    img {
      width: 200px;
    }
  }

  .category {
    .menu-button {
      display: none;
    }
    ul {
      display: flex;
      gap: 32px;
      li {
        a {
          font-size: 1.5rem;
          font-weight: 600;
          text-decoration: none;
          color: ${({theme}) => theme.color.text};
          &:hover {
            color: ${({theme}) => theme.color.primary};
          }
        }
      }
    }
  }

  .auth {
    ul {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100px;
      li {
        a,
        button {
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          line-height: 1;
          background: none;
          border: 0;
          cursor: pointer;

          svg {
            margin-right: 6px;
          }
        }
      }
    }
  }

  @media screen AND (max-width: 768px) {
    height: 95px;
    .logo {
      padding: 0 0 0 8px;

      img {
        width: 125px;
        /* height: 46px; */
      }
    }

    .auth {
      position: absolute;
      top: 32px;
      right: 12px;
    }

    .category {
      .menu-button {
        display: flex;
        position: absolute;
        top: 34px;
        right: ${({$isOpen}) => ($isOpen ? '30%' : '52px')};
        background: #fff;
        border: 0;
        font-size: 1.5rem;
      }

      ul {
        position: fixed;
        top: 0;
        right: ${({$isOpen}) => ($isOpen ? '0' : '-100%')};
        width: 30%;
        height: 100vh;
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        transition: right 0.3s ease-in-out;

        margin: 0;
        padding: 24px;
        z-index: 1000;

        flex-direction: column;
        gap: 16px;
      }
    }
  }
`;

export default Headers;
