import { useReducer, Reducer } from "react";
import { Box, Grid, Paper, styled, Container } from "@mui/material";
import { DigitButton } from "./components/DigitButton";
import { OperationButton } from "./components/OperationButton";
import { MyButton } from "./components/OperationButton";
import reducer from "./features/Reducer";
import { ACTIONS } from "./types/interfaces";
import { CalcState } from "./types/interfaces";
import { CalcAction } from "./types/interfaces";
import { initialState } from "./types/interfaces";

const Calculator = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(15),
  borderRadius: 10,
}));

const PreviousOutput = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "5rem",
  textAlign: "right",
  fontSize: "1rem",
  overflow: "hidden",
  padding: theme.spacing(1),
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  opacity: "0.5",
}));

const CurrentOutput = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "5rem",
  maxHeight: "auto",
  fontSize: "2rem",
  overflow: "hidden",
  padding: theme.spacing(1),
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "flex-end",
}));

const formatNumber = (number: string): string => {
  if (number == null) return "";
  const [integer, decimal] = number.split(".");
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimal != null ? `${formattedInteger}.${decimal}` : formattedInteger;
};

const App = () => {
  const [state, dispatch] = useReducer<Reducer<CalcState, CalcAction>>(
    reducer,
    initialState
  );

  return (
    <Container maxWidth="sm">
      <Calculator elevation={6}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <PreviousOutput>
              {formatNumber(state.previousOperand)}
              {state.operation}
            </PreviousOutput>
            <CurrentOutput>{formatNumber(state.currentOperand)}</CurrentOutput>
          </Grid>
          <Grid item container columnSpacing={1}>
            <OperationButton operation={"AC"} xs={6} dispatch={dispatch} />
            <OperationButton operation={"DEL"} dispatch={dispatch} />
            <OperationButton operation={"÷"} dispatch={dispatch} />
          </Grid>
          <Grid item container columnSpacing={1}>
            <DigitButton digit={"7"} xs={3} dispatch={dispatch} />
            <DigitButton digit={"8"} xs={3} dispatch={dispatch} />
            <DigitButton digit={"9"} xs={3} dispatch={dispatch} />
            <OperationButton operation={"×"} dispatch={dispatch} />
          </Grid>
          <Grid item container columnSpacing={1}>
            <DigitButton digit={"4"} xs={3} dispatch={dispatch} />
            <DigitButton digit={"5"} xs={3} dispatch={dispatch} />
            <DigitButton digit={"6"} xs={3} dispatch={dispatch} />
            <OperationButton operation={"-"} dispatch={dispatch} />
          </Grid>
          <Grid item container columnSpacing={1}>
            <DigitButton digit={"1"} xs={3} dispatch={dispatch} />
            <DigitButton digit={"2"} xs={3} dispatch={dispatch} />
            <DigitButton digit={"3"} xs={3} dispatch={dispatch} />
            <OperationButton operation={"+"} dispatch={dispatch} />
          </Grid>
          <Grid item container columnSpacing={1}>
            <DigitButton digit={"0"} xs={6} dispatch={dispatch} />
            <DigitButton digit={"."} xs={3} dispatch={dispatch} />
            <Grid item xs={3}>
              <MyButton
                fullWidth
                variant="outlined"
                onClick={() =>
                  dispatch({ type: ACTIONS.CALCULATE, payload: {} })
                }
              >
                =
              </MyButton>
            </Grid>
          </Grid>
        </Grid>
      </Calculator>
    </Container>
  );
};

export default App;
