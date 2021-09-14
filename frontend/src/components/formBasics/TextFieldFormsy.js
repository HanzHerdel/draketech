import React from "react";
import TextField from "@material-ui/core/TextField";
import { withFormsy } from "formsy-react";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import { extractValuesFromObj } from "../../utils/ultis";
const textFieldPropsKeys = [
  "helperText",
  "autoComplete",
  "autoFocus",
  "children",
  "className",
  "defaultValue",
  "disabled",
  "FormHelperTextProps",
  "fullWidth",
  "id",
  "InputLabelProps",
  "inputProps",
  "InputProps",
  "inputRef",
  "label",
  "multiline",
  "name",
  "onBlur",
  "onChange",
  "onFocus",
  "placeholder",
  "required",
  "rows",
  "rowsMax",
  "select",
  "SelectProps",
  "type",
  "variant",
];
function TextFieldFormsy(_props) {
  const [textfieldProps, props] = extractValuesFromObj(
    textFieldPropsKeys,
    _props
  );
  const errorMessage = props.errorMessage;
  const value = props.value || "";

  function changeValue(event) {
    props.setValue(event.currentTarget.value);
    if (props.onChange) {
      props.onChange(event);
    }
  }

  return (
    <Tooltip
      PopperProps={{
        popperOptions: {
          modifiers: {
            offset: {
              enabled: true,
              offset: "0px, -24px",
            },
          },
        },
      }}
      placement="top"
      title={props.titleTooltip || ""}
      {...props.tooltipProps}
    >
      <Grid
        item
        xs={props.xs || 12}
        sm={props.sm || 6}
        md={props.md || 4}
        {...(props.margin ? { style: { ...props.margin } } : {})}
        onClick={props.onClickContainer ? props.onClickContainer : () => {}}
      >
        <TextField
          {...textfieldProps}
          onChange={changeValue}
          value={value}
          error={Boolean(errorMessage)}
          //{...(importedProps.helperText ? {} : { helperText: errorMessage })}
          {...(Boolean(errorMessage) ? { helperText: errorMessage } : {})}
        />
      </Grid>
    </Tooltip>
  );
}

export default React.memo(withFormsy(TextFieldFormsy));
