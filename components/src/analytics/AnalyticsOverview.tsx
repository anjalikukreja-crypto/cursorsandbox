import React, { useState } from 'react';
import { StatCard } from './StatCard';
import { MetricsChart } from './MetricsChart';
import { FiltersBar } from './FiltersBar';
import { PageHeader } from './PageHeader';
import { Card } from '../Card';
import { overviewStats, overviewTimeSeries } from '../data/mockAnalytics';
import './AnalyticsOverview.css';

export const AnalyticsOverview: React.FC = () => {
  const [dateRange, setDateRange] = useState('7d');
  const [org, setOrg] = useState('all');

  return (
    <div className="analytics-overview">
      <PageHeader
        title="Analytics Overview"
        subtitle="Key metrics across usage and business performance"
      />
      <FiltersBar
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        org={org}
        onOrgChange={setOrg}
      />
      <section className="analytics-overview__stats">
        {overviewStats.map((metric) => (
          <StatCard key={metric.id} metric={metric} />
        ))}
      </section>
      <section className="analytics-overview__chart">
        <MetricsChart data={overviewTimeSeries} title="Active Users (7 days)" />
      </section>
      <section className="analytics-overview__card-preview">
        <Card
          heading="Get started with analytics"
          subtext="Explore usage trends, segment performance, and key business metrics in one place."
          buttonLabel="View details"
          onButtonClick={() => window.alert('Card button clicked!')}
        />
      </section>
    </div>
  );
};
