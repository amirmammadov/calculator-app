import { ACTIONS } from "../types/interfaces";
import { CalcAction } from "../types/interfaces";
import { CalcState } from "../types/interfaces";
import { initialState } from "../types/interfaces";

const reducer = (state: CalcState, action: CalcAction): CalcState => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.isFinish && payload.digit != null) {
        return {
          ...state,
          isFinish: false,
          currentOperand: payload.digit,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit === "." && state.currentOperand.includes("."))
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CLEAR:
      return initialState;
    case ACTIONS.DELETE_DIGIT:
      if (state.isFinish) {
        return {
          ...state,
          isFinish: false,
          currentOperand: "",
        };
      }
      if (state.currentOperand == "") {
        return state;
      }
      if (state.currentOperand?.length === 1) {
        return {
          ...state,
          currentOperand: "",
        };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == "" && state.previousOperand == "") {
        return initialState;
      }

      if (payload.operation != null && state.currentOperand == "") {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (payload.operation != null && state.previousOperand == "") {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: "",
        };
      }

      if (payload.operation != null) {
        return {
          ...state,
          currentOperand: "",
          operation: payload.operation,
          previousOperand: calculate(state),
        };
      }

      return state;

    case ACTIONS.CALCULATE:
      if (
        state.currentOperand == "" ||
        state.previousOperand == "" ||
        state.operation == ""
      ) {
        return state;
      }

      return {
        ...state,
        isFinish: true,
        currentOperand: calculate(state),
        previousOperand: "",
        operation: "",
      };
  }

  return state;
};

const calculate = ({
  previousOperand,
  currentOperand,
  operation,
}: CalcState): string => {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) && isNaN(current)) return "";
  let result = "";
  switch (operation) {
    case "+":
      result = (prev + current).toString();
      break;
    case "-":
      result = (prev - current).toString();
      break;
    case "÷":
      result = (prev / current).toString();
      break;
    case "×":
      result = (prev * current).toString();
      break;
  }
  return result.toString();
};

export default reducer;
