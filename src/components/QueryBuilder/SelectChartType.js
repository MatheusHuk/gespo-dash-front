import React from 'react';
import {
  Menu, Dropdown
} from 'antd';
import { Icon } from '@ant-design/compatible';

import styled from 'styled-components';

const StyledDropdownTrigger = styled.span`
  color: #43436B;
  cursor: pointer;
  margin-left: 13px;

  & > span {
    margin: 0 8px;
  }
`

const ChartTypes = [
  {
    name: "line",
    title: "Gráfico de Linha",
    icon: "line-chart"
  },
  {
    name: "area",
    title: "Gráfico de Área",
    icon: "area-chart"
  },
  {
    name: "bar",
    title: "Gráfico de Barra",
    icon: "bar-chart"
  },
  {
    name: "pie",
    title: "Gráfico de Pizza",
    icon: "pie-chart"
  },
  {
    name: "table",
    title: "Tabela",
    icon: "table"
  },
  {
    name: "number",
    title: "Card Numérico",
    icon: "info-circle"
  }
];

const SelectChartType = ({ chartType, updateChartType }) => {
  const menu = (
    <Menu>
      {ChartTypes.map(m => (
        <Menu.Item key={m.title} onClick={() => updateChartType(m.name)}>
          <Icon type={m.icon} />
          &nbsp;{m.title}
        </Menu.Item>
      ))}
    </Menu>
  );

  const foundChartType = ChartTypes.find(t => t.name === chartType);
  return (
    <Dropdown overlay={menu} icon={foundChartType.icon} lacement="bottomLeft" trigger={['click']}>
    <StyledDropdownTrigger>
      <Icon type={foundChartType.icon} />
      <span>{foundChartType.title}</span>
      <Icon type="caret-down" />
    </StyledDropdownTrigger>
    </Dropdown>
  );
};

export default SelectChartType;