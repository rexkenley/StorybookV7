import { useState, useEffect } from "react";
import { Stack, IStackProps } from "@fluentui/react/lib/Stack";
import { TagPicker, ITag, IBasePickerProps } from "@fluentui/react/lib/Pickers";
import { Label } from "@fluentui/react/lib/Label";
import { TooltipHost } from "@fluentui/react/lib/Tooltip";
import {
  IconButton,
  ActionButton,
  IButtonProps
} from "@fluentui/react/lib/Button";
import {
  Callout,
  Checkbox,
  ICalloutProps,
  ICheckboxProps
} from "@fluentui/react";
import { mergeStyles } from "@fluentui/merge-styles/lib/mergeStyles";
import { CommandBar, ICommandBarProps } from "@fluentui/react/lib/CommandBar";
import { useBoolean } from "@fluentui/react-hooks/lib/useBoolean";
import { useId } from "@fluentui/react-hooks/lib/useId";

import tagSort from "../../ts/tagSort";

export enum optionTypes {
  SingleSelect = "SingleSelect",
  MultiSelect = "MultiSelect",
  TwoOptions = "TwoOptions"
}

export interface IOptionSetProps {
  /**
   * An optional boolean that disables the control.
   */
  disabled?: boolean;
  /**
   * An optional boolean that displays the control.
   */
  visible?: boolean;
  /**
   * An array of available IKeyValue options
   */
  options: ITag[];
  /**
   * An array of selected IKeyValue
   */
  selected: ITag[];
  /**
   * A function that fires when the selection is changed
   */
  onChange: (items: ITag[]) => void;
  /**
   * An optional optionTypes that determines the type of ui
   */
  optionType?: optionTypes;
}

export default function OptionSet({
  disabled = false,
  visible = true,
  options = [],
  selected = [],
  onChange,
  optionType = optionTypes.SingleSelect
}: IOptionSetProps): JSX.Element {
  const [currentSelected, setSelected] = useState(selected),
    [optionsShown, { setTrue: showOptions, setFalse: hideOptions }] =
      useBoolean(false),
    id = useId("Picker"),
    isMultiSelect = optionType === optionTypes.MultiSelect,
    sProps: IStackProps = {
      horizontal: true,
      wrap: true
    },
    ibSwitchProps: IButtonProps = {
      disabled: disabled || !options.length,
      iconProps: { iconName: "RepeatAll" },
      onClick: () => {
        const item = [
          options[
            !currentSelected.length ||
            options.findIndex((o) => currentSelected[0].key === o.key)
              ? 0
              : 1
          ]
        ];
        onChange && onChange(item);
        setSelected(item);
      }
    },
    ibClearProps: IButtonProps = {
      disabled: disabled || !options.length,
      iconProps: { iconName: "Clear" },
      onClick: () => {
        onChange && onChange([]);
        setSelected([]);
      }
    },
    tpProps: IBasePickerProps<ITag> = {
      disabled,
      itemLimit: isMultiSelect ? undefined : 1,
      selectedItems: currentSelected,
      onChange: (items?: ITag[]) => {
        if (!items) items = [];

        onChange && onChange(items);
        setSelected(items);
      },
      onResolveSuggestions: (
        filter: string,
        selectedItems?: ITag[]
      ): ITag[] => {
        return options?.filter((o) =>
          o.name.toLowerCase().includes(filter.toLowerCase())
        );
      },
      getTextFromItem: (item: ITag) => item.name,
      pickerSuggestionsProps: {
        suggestionsHeaderText: "Options",
        noResultsFoundText: "No Options Found"
      }
    },
    ibProps: IButtonProps = {
      disabled: disabled || !options.length,
      iconProps: {
        iconName: isMultiSelect ? "DoubleChevronDown" : "ChevronDown"
      },
      onClick: () => {
        showOptions();
      }
    },
    coProps: ICalloutProps = {
      target: `#${id}`,
      dismissOnTargetClick: !isMultiSelect,
      hidden: !optionsShown,
      alignTargetEdge: true,
      gapSpace: 5,
      isBeakVisible: false,
      className: mergeStyles({ padding: "10px" }),
      setInitialFocus: true,
      onDismiss: () => {
        hideOptions();
      }
    },
    cbProps: ICommandBarProps = {
      items: [
        {
          key: "selectAll",
          iconOnly: true,
          iconProps: { iconName: "CheckList" },
          tooltipHostProps: { content: "Select All" },
          disabled: currentSelected.length === options.length,
          onClick: () => {
            onChange && onChange([...options]);
            setSelected([...options]);
          }
        },
        {
          key: "deselectAll",
          iconOnly: true,
          iconProps: { iconName: "CheckListText" },
          tooltipHostProps: { content: "Deselect All" },
          disabled: !currentSelected.length,
          onClick: () => {
            onChange && onChange([]);
            setSelected([]);
          }
        }
      ],
      farItems: [
        {
          key: "close",
          iconOnly: true,
          iconProps: { iconName: "ChromeClose" },
          tooltipHostProps: { content: "Close" },
          onClick: () => {
            hideOptions();
          }
        }
      ]
    };

  useEffect(() => {
    setSelected(selected);
  }, [selected?.map((kv) => kv.key).join()]);

  if (!visible) return <></>;

  if (optionType === optionTypes.TwoOptions)
    return (
      <Stack horizontal tokens={{ childrenGap: 10 }}>
        <Label>
          {currentSelected.length ? currentSelected[0].name : "(None)"}
        </Label>
        <TooltipHost content="Switch">
          <IconButton {...ibSwitchProps} />
        </TooltipHost>
        <TooltipHost content="Clear">
          <IconButton {...ibClearProps} />
        </TooltipHost>
      </Stack>
    );

  return (
    <>
      <Stack horizontal id={id}>
        <TagPicker {...tpProps} />
        <IconButton {...ibProps} />
      </Stack>
      <Callout {...coProps}>
        {isMultiSelect && <CommandBar {...cbProps} />}
        <Stack {...sProps}>
          {options.sort(tagSort).map((o) => {
            const cbProps: ICheckboxProps = {
                label: o.name,
                checked: currentSelected.some((kv) => kv.key === o.key),
                onChange: (
                  ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
                  checked?: boolean
                ) => {
                  if (checked) {
                    onChange && onChange([...currentSelected, o]);
                    setSelected([...currentSelected, o]);
                  } else {
                    onChange &&
                      onChange(
                        currentSelected.filter((kv) => kv.key !== o.key)
                      );
                    setSelected(
                      currentSelected.filter((kv) => kv.key !== o.key)
                    );
                  }
                }
              },
              abProps: IButtonProps = {
                onClick: () => {
                  onChange && onChange([o]);
                  setSelected([o]);
                  hideOptions();
                }
              };

            if (isMultiSelect)
              return (
                <Stack.Item
                  align="auto"
                  key={o.key}
                  className={mergeStyles({ padding: "10px" })}
                >
                  <Checkbox {...cbProps} />
                </Stack.Item>
              );

            return (
              <Stack.Item align="auto" key={o.key}>
                <ActionButton {...abProps}>{o.name}</ActionButton>
              </Stack.Item>
            );
          })}
        </Stack>
      </Callout>
    </>
  );
}
