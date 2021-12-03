import * as React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import CircleForm from './components/CircleForm';

const { Cell } = ResponsiveGrid;

const Dashboard = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <CircleForm />
      </Cell>
    </ResponsiveGrid>
  );
};

export default Dashboard;
