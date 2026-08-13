/**
 * 类型判断工具函数
 */

/**
 * 判断值是否为布尔值
 * @param value 任意值
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

/**
 * 判断值是否为数组
 * @param value 任意值
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}

/**
 * 判断值是否为字符串
 * @param value 任意值
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/**
 * 判断值是否为对象（不包含 null、数组）
 * @param value 任意值
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

/**
 * 判断值是否为对象（包含数组）
 * @param value 任意值
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false
  }
  const prototype = Object.getPrototypeOf(value)
  return prototype === null || prototype === Object.prototype
}
