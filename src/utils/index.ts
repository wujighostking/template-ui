export function isEmpty(val: any) {
  if (Array.isArray(val)) {
    return val.length === 0
  }

  if (val === undefined || val === null) {
    return true
  }

  if (typeof val === 'string') {
    return val.trim() === ''
  }

  return false
}
