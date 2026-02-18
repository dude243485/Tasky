import  { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useMemo } from 'react';
import { useTheme } from '../../services/ThemeContext';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';


interface DOBProps {
  onDateChange: (value: Dayjs | null) => void;
  value: Dayjs | null;
  error?: string;
  label?: string;
  required?: boolean;
}

export default function DatePickerValue({ onDateChange, error, value, label, required }: DOBProps) {
  const { isDark } = useTheme();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDark ? 'dark' : 'light',
        },
      }),
    [isDark],
  );

  return (
    <MuiThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="w-full mb-4">
          {label && (
            <label
              htmlFor={label}
              className="block text-[12px] font-medium text-slate-400 dark:text-slate-300 mb-1"
            >
              {label}
              {required && <span className="text-brand-error-600 text-[12px] ml-1">*</span>}
            </label>
          )}
          <MobileDatePicker
            value={value}
            onChange={onDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!error,
                placeholder: "Select Date",
                sx: {
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0.375rem", // rounded-md
                    backgroundColor: "transparent",
                    transition: "all 0.2s ease-in-out",
                    border: "1px solid",
                    borderColor: error ? "#DB2719" : "#94a3b8", // brand-error-600 : slate-400
                    boxShadow: "0 0 0 1px #546FFF, 0 1px 2px 0 rgb(0 0 0 / 0.05)", // shadow-sm
                    "&:hover": {
                      outline: "none",
                      borderColor: error ? "#DB2719" : "#94a3b8",
                    },
                    "&.Mui-focused": {
                      borderColor: error ? "#DB2719" : "#546FFF", // brand-error-600 : brand-primary-500
                      boxShadow: error
                        ? "0 0 0 1px #DB2719, 0 1px 2px 0 rgb(0 0 0 / 0.05)"
                        : "0 0 0 1px #546FFF, 0 1px 2px 0 rgb(0 0 0 / 0.05)",
                    },
                    "& fieldset": {
                      border: "none", // Remove default MUI fieldset to use our custom border on root
                    },
                    paddingRight: "16px", // pr-4
                  },
                  "& .MuiInputBase-input": {
                    marginTop : "16px",
                    padding: "16px 0 16px 16px", // py-4 pl-4
                    fontSize: "14px",
                    color: "inherit",
                    borderColor: "blue"
                  },
                  "& .MuiSvgIcon-root": {
                    color: "#94a3b8" // slate-400
                  }

                }
              },
              dialog: {
                sx: {
                  "& .MuiPaper-root": {
                    backgroundColor: isDark ? "#0f172a" : "#fff", // slate-900 or white
                    color: isDark ? "#fff" : "inherit",
                    backgroundImage: "none"
                  },
                  "& .MuiPickersDay-root": {
                    color: isDark ? "#cbd5e1" : "inherit", // slate-300
                    "&.Mui-selected": {
                      backgroundColor: "#546FFF", // brand-primary-500
                      color: "#fff"
                    }
                  },
                  "& .MuiDayCalendar-weekDayLabel": {
                    color: isDark ? "#94a3b8" : "#64748b" // slate-400 : slate-500
                  },
                  "& .MuiPickersCalendarHeader-label": {
                    color: isDark ? "#e2e8f0" : "inherit" // slate-200
                  },
                  "& .MuiSvgIcon-root": {
                    color: isDark ? "#94a3b8" : "inherit"
                  }
                }
              }
            }}
          />
          {error && <p className="mt-1 text-[11px] text-brand-error-600 font-medium">{error}</p>}
        </div>
      </LocalizationProvider>
    </MuiThemeProvider>
  );
}
