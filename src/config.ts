export type LoggerConfig = {
  serviceName: string;
  /**
   * @default checks {@link process.env.npm_package_version}, if not present 'unknown' is used
   */
  serviceVersion?: string;
  /**
   * @default checks {@link process.env.NODE_ENV}, if not present 'unknown' is used
   */
  environment?: string;

  loki?: {
    /**
     * Loki server URL.
     */
    host: string;

    auth?: {
      username: string;
      password: string;
    };

    /**
     * @defaulf 5000
     */
    sendInternalMs?: number;

    /**
     * Additional labels.
     */
    labels?: Record<string, string>;
  }
}
