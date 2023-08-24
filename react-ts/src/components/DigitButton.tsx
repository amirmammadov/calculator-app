import { Grid, Button, styled } from "@mui/material";
import { ACTIONS } from "../types/interfaces";
import { CalcAction } from "../types/interfaces";

interface DigitButtonProps {
  digit: string;
  xs?: number;
  dispatch: React.Dispatch<CalcAction>;
}

const MyButton = styled(Button)({
  backgroundColor: "rgba(77, 77, 78, 1)",
  color: "#fff",
  borderRadius: "1rem",
  "&:hover": {
    backgroundColor: "rgba(77, 77, 78, 0.8)",
    border: "none",
  },
  border: "none",
});

export const DigitButton: React.FC<DigitButtonProps> = ({
  digit,
  xs = 3,
  dispatch,
}) => {
  const handleClick = () => {
    dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
  };

  return (
    <Grid item xs={xs}>
      <MyButton fullWidth variant="outlined" onClick={handleClick}>
        {digit}
      </MyButton>
    </Grid>
  );
};
