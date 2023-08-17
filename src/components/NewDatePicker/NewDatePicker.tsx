import React, { forwardRef, memo, useCallback, useState } from "react";
import { Flex, Calendar, DateField } from "..";
import { Action } from "../Calendar/internal/Actions";
import { Dayjs } from "dayjs";
import {
  flip,
  offset,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";

export type NewDatePickerProps = {
  date: Dayjs;
  actions?: Action[];
  format?: string;
  onDateChange: (date: Dayjs) => void;
};

/**
 * @memo 次のメジャーリリースで DatePicker に変更。現行の DatePicker は削除。
 */
export const NewDatePicker = forwardRef<HTMLDivElement, NewDatePickerProps>(
  function DatePicker(
    { date, format = "YYYY-MM-DD", actions, onDateChange },
    ref,
  ) {
    const [open, setOpen] = useState(false);
    const { context, refs, strategy, x, y } = useFloating({
      placement: "right-start",
      open,
      onOpenChange: setOpen,
      middleware: [offset(10), flip()],
    });

    const dismiss = useDismiss(context);
    const role = useRole(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
      dismiss,
      role,
    ]);

    const handleClickCalendarIcon = useCallback(() => {
      setOpen((prev) => !prev);
    }, []);

    const handleClickDate = useCallback(
      (date: Dayjs) => {
        onDateChange(date);
        setOpen(false);
      },
      [onDateChange],
    );

    const handleClose = useCallback(() => {
      setOpen(false);
    }, []);

    return (
      <Flex ref={ref} style={{ width: "fit-content" }}>
        <div ref={refs.setReference} {...getReferenceProps()}>
          <DateField
            date={date}
            format={format}
            onClick={handleClickCalendarIcon}
            onDateChange={onDateChange}
          />
        </div>
        {open && (
          <Calendar
            ref={refs.setFloating}
            date={date}
            actions={actions}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              zIndex: 100,
            }}
            onClickCloseButton={handleClose}
            onDateChange={handleClickDate}
            {...getFloatingProps()}
          />
        )}
      </Flex>
    );
  },
);

export default memo(NewDatePicker);
