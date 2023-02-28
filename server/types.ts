/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SearchRelevancePluginRequestContext {
    addMetrics: (componentName: string, action: string, statusCode: string, value: number) => void;
}

declare module 'src/core/server' {
  interface RequestHandlerContext {
    searchRelevance: SearchRelevancePluginRequestContext;
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SearchRelevancePluginSetup {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SearchRelevancePluginStart {}
