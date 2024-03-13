export const shoeColors = ["Black", "Brown", "White", "Gray", "Navy", "Tan", "Beige", "Red", "Blue", "Green"];
export const shoeColorOptions = shoeColors.map((item) => ({
  value: item,
  label: item,
}));
export const colorsArray = shoeColors.map((item) => ({
  text: item,
  value: item,
}));

const shoeMaterial = [
  "Leather",
  "Canvas",
  "Suede",
  "Synthetic",
  "Mesh",
  "Rubber",
  "Knit",
  "Nylon",
  "Patent Leather",
  "Velvet",
];
export const shoeMaterialOptions = shoeMaterial.map((item) => ({
  value: item,
  label: item,
}));

export const shoeSizes = ["36", "37", "38", "39", "40", "41", "42", "43", "44"];
export const shoeSizesOptions = shoeSizes.map((item) => ({
  value: item,
  label: item,
}));
export const sizesArray = shoeSizes.map((item) => ({
  text: item,
  value: item,
}));

const shoeStyles = ["Sneakers", "Boots", "Loafers", "Oxfords"];
export const shoeStylesOptions = shoeStyles.map((item) => ({
  value: item,
  label: item,
}));
export const stylesArray = shoeStyles.map((item) => ({
  text: item,
  value: item,
}));

const polishType = ["Standard", "Waterproof", "Protective"];
export const polishTypeOptions = polishType.map((item) => ({
  value: item,
  label: item,
}));

const shineLevel = ["Low", "Medium", "Hight"];
export const shineLevelOptions = shineLevel.map((item) => ({
  value: item,
  label: item,
}));

export const shoeQuantity = ["1", "2", "3", "4", "5"];
