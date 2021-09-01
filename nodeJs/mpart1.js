const M = {
  v: 'v',
  f: function () {
    console.log(this.v);
  },
};

module.exports = M; //M모듈을 밖으로 내보내기
