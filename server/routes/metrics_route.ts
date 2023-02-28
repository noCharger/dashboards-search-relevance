/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { schema } from '@osd/config-schema';

import { IRouter } from '../../../../src/core/server';
import { MetricsServiceSetup } from '../metrics_service';
import { ServiceEndpoints } from '../../common';

export function registerMetricsRoute(router: IRouter, metricsServiceSetup: MetricsServiceSetup) {
  router.get(
    {
      path: ServiceEndpoints.GetStats,
      validate: false,
    },
    async (
      context,
      request,
      response
    ) => {
      try {
        const metrics = metricsServiceSetup.getStats();
        return response.ok({
          body: metrics,
        });
      } catch (error) {
        console.error(error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );
}
