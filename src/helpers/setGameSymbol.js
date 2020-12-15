import CloseIcon from "@material-ui/icons/Close";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

export const setGameSymbol = (symbolNumber) => {
  // 0 - nothing
  // 1 - cross
  // 2 - circle
  switch (symbolNumber) {
    case 0:
      return "";
    case 1:
      return <CloseIcon className="gameSymbol" />;
    case 2:
      return <RadioButtonUncheckedIcon className="gameSymbol" />;
    default:
      return "";
  }
};
