import React from 'react';
import { Menu } from 'antd';
import ButtonDropdown from './ButtonDropdown';
import MemberDropdown from './MemberDropdown';
import RemoveButtonGroup from './RemoveButtonGroup';
import MemberGroupTitle from './MemberGroupTitle';
import PlusIcon from './PlusIcon';
import styled from 'styled-components';

const DateRanges = [
  {
    title: "Sempre",
    value: undefined
  },
  {
    title: "Hoje",
    value: "Today"
  },
  {
    title: "Ontem",
    value: "Yesterday"
  },
  {
    title: "Essa semana",
    value: "This week"
  },
  {
    title: "Esse mês",
    value: "This month"
  },
  {
    title: "Nesse semestre",
    value: "This quarter"
  },
  {
    title: "Nesse ano",
    value: "This year"
  },
  {
    title: "Últimos 7 dias",
    value: "Last 7 days"
  },
  {
    title: "Últimos 30 dias",
    value: "Last 30 days"
  },
  {
    title: "Última semana",
    value: "Last week"
  },
  {
    title: "Último mês",
    value: "Last month"
  },
  {
    title: "Último semestre",
    value: "Last quarter"
  },
  {
    title: "Último ano",
    value: "Last year"
  }
];

const GroupLabel = styled.span`
  font-size: 14px;
  margin: 0 12px;
`

const TimeGroup = ({
  members, availableMembers, addMemberName, updateMethods, title
}) => {
  const granularityMenu = (member, onClick) => (
    <Menu>
      {member.granularities.length ? member.granularities.map(m => (
        <Menu.Item key={m.title} onClick={() => onClick(m)}>
          {m.title}
        </Menu.Item>
      )) : <Menu.Item disabled>Nenhum dado encontrado</Menu.Item>}
    </Menu>
  );

  const dateRangeMenu = (onClick) => (
    <Menu>
      {DateRanges.map(m => (
        <Menu.Item key={m.title || m.value} onClick={() => onClick(m)}>
          {m.title || m.value}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div>
      <MemberGroupTitle title={title} />
      {members.map(m => [
        <RemoveButtonGroup onRemoveClick={() => updateMethods.remove(m)} key={`${m.dimension.name}-member`}>
          <MemberDropdown
            type="selected"
            onClick={updateWith => updateMethods.update(m, { ...m, dimension: updateWith })}
            availableMembers={availableMembers}
          >
            {m.dimension.title}
          </MemberDropdown>
        </RemoveButtonGroup>,
        <GroupLabel key={`${m.dimension.name}-for`}>Para</GroupLabel>,
        <ButtonDropdown
          type="time-group"
          overlay={dateRangeMenu(dateRange => updateMethods.update(m, { ...m, dateRange: dateRange.value }))}
          key={`${m.dimension.name}-date-range`}
        >
          {m.dateRange || 'All time'}
        </ButtonDropdown>,
        <GroupLabel key={`${m.dimension.name}-by`}>Por</GroupLabel>,
        <ButtonDropdown
          type="time-group"
          overlay={granularityMenu(
            m.dimension,
            granularity => updateMethods.update(m, { ...m, granularity: granularity.name })
          )}
          key={`${m.dimension.name}-granularity`}
        >
          {
            m.dimension.granularities.find(g => g.name === m.granularity)
            && m.dimension.granularities.find(g => g.name === m.granularity).title
          }
        </ButtonDropdown>
      ])}
      {!members.length && (
        <MemberDropdown
          onClick={member => updateMethods.add({ dimension: member, granularity: 'day' })}
          availableMembers={availableMembers}
          type="new"
        >
          {addMemberName}
           <PlusIcon />
        </MemberDropdown>
      )}
    </div>
  );
};

export default TimeGroup;