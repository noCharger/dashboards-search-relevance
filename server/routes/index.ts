/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { ILegacyClusterClient, IRouter } from '../../../../src/core/server';
import { MetricsServiceSetup } from '../metrics_service';
import { registerDslRoute } from './dsl_route';
import { registerMetricsRoute } from './metrics_route';

export function defineRoutes( router: IRouter, metricsServiceSetup: MetricsServiceSetup) {
  registerDslRoute( router, metricsServiceSetup );
  registerMetricsRoute( router, metricsServiceSetup );
}
