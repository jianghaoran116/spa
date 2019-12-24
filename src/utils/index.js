/* eslint-disable no-useless-escape */
// 千分位
function formatCash(num) {
  try {
    if (typeof (num) !== 'string' && typeof (num) !== 'number') {
      throw new Error('Unsupported data type');
    }
    return `${(num * 1).toFixed(2)}`.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
  } catch (err) {
    return err;
  }
}

// 获取地址栏数据
function formatUri(path) {
  const pathInfo = /^([^\?]*?)(\?[^#]*?)?(\#.*?)?$/.exec(path);
  return {
    pathname: pathInfo[1],
    search: pathInfo[2],
    hash: pathInfo[3],
  };
}

// 获取地址栏search部分的数据
function formatSearch(path) {
  const location = formatUri(path);
  const arr = location.search.split('?')[1].split('&');
  const param = {};

  arr.forEach((item) => {
    const itemArr = item.split('=');
    // eslint-disable-next-line prefer-destructuring
    param[itemArr[0]] = itemArr[1];
  });

  return param;
}

export default {
  formatCash,
  formatUri,
  formatSearch,
};
