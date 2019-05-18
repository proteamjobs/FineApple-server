module.exports = country_code => {
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
