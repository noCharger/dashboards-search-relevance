/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { schema, TypeOf } from '@osd/config-schema';

const METRICS_REFRESH_TIME: number = 30000;

export const configSchema = schema.object({
  metrics: schema.object({
    enabled: schema.boolean({ defaultValue: true }),
    refreshTime: schema.number({ defaultValue: METRICS_REFRESH_TIME }),
  }),
});

export type SearchRelevancePluginConfigType = TypeOf<typeof configSchema>;
