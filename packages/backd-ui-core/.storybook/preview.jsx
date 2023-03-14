import { ThemeProvider } from "@mui/material";
import Theme from "../src/theme/Theme";

export const decorators = [
  (Story) => (
    <ThemeProvider theme={Theme}>
      <Story />
    </ThemeProvider>
  ),
];
