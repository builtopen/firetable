import React from "react";

import { makeStyles, createStyles } from "@material-ui/core";

import { FieldType } from "constants/fields";
import { getFormatter } from "components/Table/formatters";
import EmptyState from "components/EmptyState";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      height: 43,
      position: "relative",
      overflow: "hidden",
      whiteSpace: "nowrap",

      pointerEvents: "none",

      border: `1px solid #e0e0e0`,
      borderTopWidth: 0,
      backgroundColor: theme.palette.background.paper,

      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1.5),

      ...theme.typography.body2,
      fontSize: "0.75rem",
      lineHeight: "inherit",
      color: theme.palette.text.secondary,
    },

    value: {
      width: "100%",
      maxHeight: 43,

      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
  })
);

export interface ICellProps
  extends Partial<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  > {
  field: string;
  type: FieldType;
  value: any;
  name?: string;
}

export default function Cell({
  field,
  type,
  value,
  name,
  ...props
}: ICellProps) {
  const classes = useStyles();

  const formatter = type ? getFormatter({ type: type }, true) : null;

  return (
    <div className={classes.root} {...props}>
      <div className={classes.value}>
        {formatter ? (
          React.createElement(formatter, {
            value,
            rowIdx: 0,
            column: {
              type,
              key: field,
              name,
              config: { options: [] },
            } as any,
            row: { [field]: value },
            isRowSelected: false,
            onRowSelectionChange: () => {},
            isSummaryRow: false,
          } as any)
        ) : typeof value === "string" ||
          typeof value === "number" ||
          value === undefined ||
          value === null ? (
          value
        ) : typeof value === "boolean" ? (
          value.toString()
        ) : (
          <EmptyState basic wrap="nowrap" message="Invalid column type" />
        )}
      </div>
    </div>
  );
}
