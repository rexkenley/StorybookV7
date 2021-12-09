import { ComponentStory, ComponentMeta } from "@storybook/react";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import { ITag } from "@fluentui/react/lib/Pickers";
import { within, userEvent, screen, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import OptionSet, {
  IOptionSetProps,
  optionTypes
} from "../../../src/components/OptionSet/OptionSet";

initializeIcons();

export default {
  title: "Components/Organisms/OptionSet",
  component: OptionSet,
  parameters: {
    componentSubtitle:
      "An OptionSet/MultiSelectOptionSet/TwoOptions component that displays the options alphabetically horizontally"
  },
  argTypes: {
    onChange: { action: "Change" }
  }
} as ComponentMeta<typeof OptionSet>;

const options: ITag[] = [
  { key: "key1", name: "Value 1" },
  { key: "key2", name: "Value 2" },
  { key: "key3", name: "Value 3" },
  { key: "key4", name: "Value 4" },
  { key: "key5", name: "Value 5" }
];

const Template: ComponentStory<typeof OptionSet> = (args: IOptionSetProps) => (
  <OptionSet {...args} />
);

export const Default = Template.bind({});
Default.parameters = { jest: ["OptionSet.spec.tsx"] };
Default.args = { options: [], selected: [] };

export const Disabled = Template.bind({});
Disabled.parameters = { jest: ["OptionSet.spec.tsx"] };
Disabled.args = { ...Default.args, disabled: true };

export const Invisible = Template.bind({});
Invisible.parameters = { jest: ["OptionSet.spec.tsx"] };
Invisible.args = { ...Default.args, visible: false };

export const Options5 = Template.bind({});
Options5.parameters = { jest: ["OptionSet.spec.tsx"] };
Options5.args = { ...Default.args, options };
Options5.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByRole("button"));
};

const lotsOfOptions: ITag[] = [];

for (let i = 0; i < 100; i += 1) {
  lotsOfOptions.push({ key: i, name: `Value ${i}` });
}

export const LotsOfOptions = Template.bind({});
LotsOfOptions.parameters = { jest: ["OptionSet.spec.tsx"] };
LotsOfOptions.args = { ...Default.args, options: lotsOfOptions };
LotsOfOptions.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByRole("button"));
};

export const MultiSelect = Template.bind({});
MultiSelect.parameters = { jest: ["OptionSet.spec.tsx"] };
MultiSelect.args = {
  ...Default.args,
  options,
  optionType: optionTypes.MultiSelect
};
MultiSelect.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByRole("button"));
};

export const TwoOptions = Template.bind({});
TwoOptions.parameters = { jest: ["OptionSet.spec.tsx"] };
TwoOptions.args = { ...Default.args, optionType: optionTypes.TwoOptions };

export const Value = Template.bind({});
Value.parameters = { jest: ["OptionSet.spec.tsx"] };
Value.args = { ...Default.args, selected: [{ key: "key1", name: "Value 1" }] };

export const MultipleValues = Template.bind({});
MultipleValues.parameters = { jest: ["OptionSet.spec.tsx"] };
MultipleValues.args = {
  ...Default.args,
  optionType: optionTypes.MultiSelect,
  selected: [
    { key: "key1", name: "Value 1" },
    { key: "key2", name: "Value 2" },
    { key: "key3", name: "Value 3" }
  ]
};

export const TwoOptionsValue = Template.bind({});
TwoOptionsValue.parameters = { jest: ["OptionSet.spec.tsx"] };
TwoOptionsValue.args = {
  ...Default.args,
  optionType: optionTypes.TwoOptions,
  options: [
    { key: "key1", name: "Value 1" },
    { key: "key2", name: "Value 2" }
  ],
  selected: [{ key: "key1", name: "Value 1" }]
};

export const TwoOptionsNoValue = Template.bind({});
TwoOptionsNoValue.parameters = { jest: ["OptionSet.spec.tsx"] };
TwoOptionsNoValue.args = {
  ...Default.args,
  optionType: optionTypes.TwoOptions,
  options: [
    { key: "key1", name: "Value 1" },
    { key: "key2", name: "Value 2" }
  ]
};

export const OnChangeTwoOptions = Template.bind({});
OnChangeTwoOptions.parameters = { jest: ["OptionSet.spec.tsx"] };
OnChangeTwoOptions.args = { ...TwoOptionsValue.args };
OnChangeTwoOptions.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getAllByRole("button")[0]);
};

export const OnChangeTwoOptionsClear = Template.bind({});
OnChangeTwoOptionsClear.parameters = { jest: ["OptionSet.spec.tsx"] };
OnChangeTwoOptionsClear.args = { ...TwoOptionsValue.args };
OnChangeTwoOptionsClear.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getAllByRole("button")[1]);
};

export const OnChangeOptionsSelect = Template.bind({});
OnChangeOptionsSelect.parameters = { jest: ["OptionSet.spec.tsx"] };
OnChangeOptionsSelect.args = { ...Options5.args };
OnChangeOptionsSelect.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByRole("button"));
  await userEvent.click(screen.getByText("Value 1"), undefined, {
    skipPointerEventsCheck: true
  });
};

export const OnChangeOptionsType = Template.bind({});
OnChangeOptionsType.parameters = { jest: ["OptionSet.spec.tsx"] };
OnChangeOptionsType.args = { ...Options5.args };
OnChangeOptionsType.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(canvas.getByRole("combobox"), "Value{enter}");
};

export const OnChangeMultiOptions = Template.bind({});
OnChangeMultiOptions.parameters = { jest: ["OptionSet.spec.tsx"] };
OnChangeMultiOptions.args = {
  ...MultiSelect.args,
  selected: [{ key: "key4", name: "Value 4" }]
};
OnChangeMultiOptions.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getAllByRole("button")[1]);
  await waitFor(async () => {
    await expect(screen.getByRole("menubar")).toBeDefined();
  });

  await userEvent.click(screen.getByText("Value 1"), undefined, {
    skipPointerEventsCheck: true
  });
  await userEvent.click(screen.getByText("Value 3"), undefined, {
    skipPointerEventsCheck: true
  });
  await userEvent.click(screen.getByText("Value 5"), undefined, {
    skipPointerEventsCheck: true
  });

  await userEvent.click(screen.getAllByText("Value 4")[1], undefined, {
    skipPointerEventsCheck: true
  });
};

export const OnChangeMultiOptionsSelectAll = Template.bind({});
OnChangeMultiOptionsSelectAll.parameters = { jest: ["OptionSet.spec.tsx"] };
OnChangeMultiOptionsSelectAll.args = { ...MultiSelect.args };
OnChangeMultiOptionsSelectAll.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByRole("button"));
  await waitFor(async () => {
    await expect(screen.getByRole("menubar")).toBeDefined();
  });

  await userEvent.click(screen.getAllByRole("menuitem")[0], undefined, {
    skipPointerEventsCheck: true
  });
};

export const OnChangeMultiOptionsDeselectAll = Template.bind({});
OnChangeMultiOptionsDeselectAll.parameters = { jest: ["OptionSet.spec.tsx"] };
OnChangeMultiOptionsDeselectAll.args = {
  ...MultiSelect.args,
  selected: [
    { key: "key1", name: "Value 1" },
    { key: "key2", name: "Value 2" },
    { key: "key3", name: "Value 3" }
  ]
};
OnChangeMultiOptionsDeselectAll.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getAllByRole("button")[3]);
  await waitFor(async () => {
    await expect(screen.getByRole("menubar")).toBeDefined();
  });

  await userEvent.click(screen.getAllByRole("menuitem")[1], undefined, {
    skipPointerEventsCheck: true
  });
};
