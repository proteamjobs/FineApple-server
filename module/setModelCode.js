module.exports = (model_code, country_code) => {
  // ex 1) JP -> MMQA2"K"/A -> MMQA2"J"/A
  // ex 2) CN -> MMQA2"K"/A -> MMQA2"CH"/A
  const changeCode = {
    kr: "kh",
    jp: "j",
    hk: "zp"
  };
  let modelCodePartA = model_code.slice(0, 5);
  let modelCodePartB = model_code.slice(7, 9);

  for (let key in changeCode) {
    console.log(key);
    if (key === country_code) {
      return modelCodePartA + changeCode[key] + modelCodePartB;
    }
  }
};
