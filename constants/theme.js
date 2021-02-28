const colors = require("./colors");
const spacing = require("./spacing");

const theme = {
  colors: colors,
  spaces: spacing.spaces,
  default: {
    // Custom variables
    baseUnit: spacing.baseUnit,
    // Ant Design Variables
    primaryColor: colors.orange.primary,
    borderColorBase: colors.neutrals[4],
    borderColorSplit: colors.neutrals[3],
  }
}

/** Override Ant Design variables */
const modifiedVariables = {
  "@primary-color": theme.default.primaryColor,
  "@border-color-base": theme.default.borderColorBase,
  "@border-color-split": theme.default.borderColorSplit
};

module.exports = { theme, modifiedVariables };
