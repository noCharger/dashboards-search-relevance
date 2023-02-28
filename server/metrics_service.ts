/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Logger } from '../../../src/core/server';

interface MetricValue {
  sum: number;
  count: number;
}

interface MetricsData {
  [key: string]: MetricValue;
}

interface Stats {
  readonly data: MetricsData;
  readonly overall: MetricValue;
  readonly componentCounts: Record<string, MetricValue>;
  readonly statusCodeCounts: Record<string, MetricValue>;
}

export interface MetricsServiceSetup {
  addMetric: (componentName: string, action: string, statusCode: string, value: number) => void;
  getStats: () => Stats;
}

export class MetricsService {
  private data: MetricsData = {};
  private overall: MetricValue = { sum: 0, count: 0 };
  private componentCounts: Record<string, MetricValue> = {};
  private statusCodeCounts: Record<string, MetricValue> = {};

  constructor(private logger: Logger) {};

  setup(resetIntervalMs: number): MetricsServiceSetup {
    // console.log(resetIntervalMs)

    setInterval(() => {
      this.resetMetrics();
    }, resetIntervalMs);

    const addMetric = (componentName: string, action: string, statusCode: string, value: number): void => {
      const key = `${componentName}-${action}-${statusCode}`;
  
      if (!this.data[key]) {
        this.data[key] = { sum: 0, count: 0 };
      }
  
      const { sum, count } = this.data[key];
  
      this.data[key] = {
        sum: sum + value,
        count: count + 1,
      };
  
      this.overall.sum += value;
      this.overall.count++;
  
      if (!this.componentCounts[componentName]) {
        this.componentCounts[componentName] = { sum: 0, count: 0 };
      }
  
      this.componentCounts[componentName] = {
        sum: this.componentCounts[componentName].sum + value,
        count: this.componentCounts[componentName].count + 1,
      };

  
      if (!this.statusCodeCounts[statusCode]) {
        this.statusCodeCounts[statusCode] = { sum: 0, count: 0 };
      }
  
      this.statusCodeCounts[statusCode] = {
        sum: this.statusCodeCounts[statusCode].sum + value,
        count: this.statusCodeCounts[statusCode].count + 1,
      };
    }

    const getStats = (): Stats => {
      return {
        data: { ...this.data },
        overall: { ...this.overall },
        componentCounts: { ...this.componentCounts },
        statusCodeCounts: { ...this.statusCodeCounts },
      };
    }

    return { addMetric, getStats };
  }

  start() {}

  stop() {
    this.resetMetrics();
  }

  resetMetrics(): void {
    this.data = {};
    this.overall.sum = 0;
    this.overall.count = 0;
    this.componentCounts = {};
    this.statusCodeCounts = {};
  }
}
