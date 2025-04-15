// src/components/NewTabPage/styles.js
import { styled } from "@mui/material/styles";

export const ShortcutButton = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  borderRadius: "50%",
  width: 48,
  height: 48,
  margin: "0 auto 8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.2s",
  "&:hover": {
    backgroundColor: theme.palette.grey[300],
  },
}));

export const AddShortcutButton = styled(ShortcutButton)({
  opacity: 0.7,
  "&:hover": {
    opacity: 1,
    backgroundColor: "#f1f3f4",
  },
});
