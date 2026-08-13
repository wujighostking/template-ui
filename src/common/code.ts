export const CODE = {
  /**
   * 请求处理成功。
   */
  SUCCESS: 0,
  /**
   * 请求未通过身份认证。
   */
  UNAUTHORIZED: 1001,
  /**
   * 身份认证通过，但无权访问请求的资源。
   */
  FORBIDDEN: 1002,
  /**
   * 服务器处理请求时发生内部错误。
   */
  ERROR: 5000,
} as const
