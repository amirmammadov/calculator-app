export enum ACTIONS {
  ADD_DIGIT = "add-digit",
  CHOOSE_OPERATION = "choose-operation",
  CLEAR = "clear",
  DELETE_DIGIT = "delete-digit",
  CALCULATE = "calculate",
}

export interface CalcState {
  previousOperand: string;
  currentOperand: string;
  operation: string;
  isFinish: boolean;
}

export const initialState: CalcState = {
  previousOperand: "",
  currentOperand: "",
  operation: "",
  isFinish: false,
};

export interface CalcAction {
  type: string;
  payload: {
    digit?: string;
    operation?: string;
  };
}
