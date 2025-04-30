import React, {useState} from 'react';
import styled from 'styled-components';

interface TabProps {
  title: string;
  children: React.ReactNode;
}

export const Tab = ({children}: TabProps) => {
  return <>{children}</>;
};

interface TabsProps {
  children: React.ReactNode;
}

export const Tabs = ({children}: TabsProps) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const tabs = React.Children.toArray(
    children,
  ) as React.ReactElement<TabProps>[];

  return (
    <TapsStyle>
      <div className="tab-header">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={activeIdx === idx ? 'active' : ''}>
            {tab.props.title}
          </button>
        ))}
      </div>
      <div className="tab-content">{tabs[activeIdx]}</div>
    </TapsStyle>
  );
};

const TapsStyle = styled.div`
  .tab-header {
    display: flex;
    gap: 2px;
    border-bottom: 1px solid #ddd;

    button {
      border: none;
      background: #ddd;
      cursor: pointer;
      font-size: 1.25rem;
      font-weight: bold;
      color: ${({theme}) => theme.color.text};
      border-radius: ${({theme}) => theme.borderRadius.default}
        ${({theme}) => theme.borderRadius.default} 0 0;
      padding: 12px 24px;

      &.active {
        color: #fff;
        background: ${({theme}) => theme.color.primary};
      }
    }
  }
  .tab-content {
    padding: 24px 0;
  }
`;
