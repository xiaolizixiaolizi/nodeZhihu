class Utils {
  // 判断为空函数
  isEmpty(value) {
    return (
      value === '' ||
      value === undefined ||
      value === null ||
      (typeof value === 'string' && value.trim().length === 0) ||
      (typeof value === 'object' && Object.keys(value).length === 0)
    )
  }

}
module.exports = new Utils()