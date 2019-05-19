module.exports = country_code => {
  // 추후에 국가가 추가되면 입력 필요함
  // ex 1) JP -> MMQA2"K"/A -> MMQA2"J"/A
  // ex 2) CN -> MMQA2"K"/A -> MMQA2"CH"/A
  const changeCode = {
    kr: "MRE82KH/A",
    jp: "MRE82J/A",
    hk: "MRE82ZP/A"
  };
  for (let key in changeCode) {
    if (key === country_code) {
      return changeCode[key];
    }
  }
};
