import { Grid, Button, styled } from "@mui/material";
import { ACTIONS } from "../types/interfaces";
import { CalcAction } from "../types/interfaces";

interface OperationButtonProps {
  operation: string;
  xs?: number;
  dispatch: React.Dispatch<CalcAction>;
}

export const MyButton = styled(Button)({
  backgroundColor: "rgba(255, 118, 33, 0.8)",
  color: "#fff",
  borderRadius: "1rem",
  "&:hover": {
    backgroundColor: "rgba(255, 118, 33, 0.6)",
    border: "none",
  },
  border: "none",
});

export const OperationButton: React.FC<OperationButtonProps> = ({
  operation,
  xs = 3,
  dispatch,
}) => {
  const handleClick = () => {
    if (operation === "AC") {
      dispatch({ type: ACTIONS.CLEAR, payload: {} });
    } else if (operation === "DEL") {
      dispatch({ type: ACTIONS.DELETE_DIGIT, payload: {} });
    } else {
      dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } });
    }
  };
  return (
    <Grid item xs={xs}>
      <MyButton fullWidth variant="outlined" onClick={handleClick}>
        {operation}
      </MyButton>
    </Grid>
  );
};
