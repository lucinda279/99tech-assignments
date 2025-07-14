import { Moon, Sun } from "lucide-react";

import { Button, Typography } from "@/components/atoms";
import { useTheme } from "@/providers/ThemeProvider";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = (props: AppLayoutProps) => {
  const { children } = props;

  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-neutral-900">
      <div className="flex flex-col gap-4 w-fit p-6 bg-background rounded-lg shadow-xl">
        <div className="flex items-center justify-between">
          <Typography variant="subhead">Swap</Typography>
          <Button
            className="rounded-md"
            variant="outline"
            size="icon"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
