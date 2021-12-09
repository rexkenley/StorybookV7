import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";

import * as stories from "./OptionSet.stories";

const {
  Default,
  Disabled,
  Invisible,
  Options5,
  LotsOfOptions,
  MultiSelect,
  TwoOptions,
  Value,
  MultipleValues,
  TwoOptionsValue,
  TwoOptionsNoValue,
  OnChangeTwoOptions,
  OnChangeTwoOptionsClear,
  OnChangeOptionsSelect,
  OnChangeOptionsType,
  OnChangeMultiOptions,
  OnChangeMultiOptionsSelectAll,
  OnChangeMultiOptionsDeselectAll
} = composeStories(stories);

test("Default", () => {
  const { container } = render(<Default />);

  expect(container.firstChild).toBeDefined();

  expect(screen.getByRole("combobox")).toBeEnabled();
  expect(screen.getByRole("button")).toBeDisabled();
  expect(container.firstChild).toMatchSnapshot();
});

test("Disabled", () => {
  const { container } = render(<Disabled />);

  expect(container.firstChild).toBeDefined();

  expect(screen.getByRole("combobox")).toBeDisabled();
  expect(screen.getByRole("button")).toBeDisabled();
  expect(container.firstChild).toMatchSnapshot();
});

test("Invisible", () => {
  const { container } = render(<Invisible />);

  expect(container.firstChild).toBeNull();
});

test("Options 5", async () => {
  const { container } = render(<Options5 />);

  expect(container.firstChild).toBeDefined();

  await Options5.play({ canvasElement: container });

  expect(container.firstChild).toMatchSnapshot();
});

test("Lots Of Options", async () => {
  const { container } = render(<LotsOfOptions />);

  expect(container.firstChild).toBeDefined();

  await LotsOfOptions.play({ canvasElement: container });

  expect(container.firstChild).toMatchSnapshot();
});

test("Multi Select", async () => {
  const { container } = render(<MultiSelect />);

  expect(container.firstChild).toBeDefined();

  await MultiSelect.play({ canvasElement: container });

  expect(container.firstChild).toMatchSnapshot();
});

test("Two Options", () => {
  const { container } = render(<TwoOptions />);

  expect(container.firstChild).toBeDefined();

  const buttons = screen.queryAllByRole("button");
  expect(buttons).toHaveLength(2);
  buttons.forEach((button) => {
    expect(button).toBeDisabled();
  });
  expect(container.firstChild).toMatchSnapshot();
});

test("Value", () => {
  const { container } = render(<Value />);

  expect(container.firstChild).toBeDefined();

  expect(screen.getByText("Value 1")).toBeEnabled();

  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(2);
  expect(buttons[0]).toBeEnabled();
  expect(buttons[1]).toBeDisabled();

  expect(container.firstChild).toMatchSnapshot();
});

test("Multiple Values", () => {
  const { container } = render(<MultipleValues />);

  expect(container.firstChild).toBeDefined();

  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(4);
  expect(buttons[0]).toBeEnabled();
  expect(buttons[1]).toBeEnabled();
  expect(buttons[2]).toBeEnabled();
  expect(buttons[3]).toBeDisabled();

  expect(container.firstChild).toMatchSnapshot();
});

test("Two Options Value", () => {
  const { container } = render(<TwoOptionsValue />);

  expect(container.firstChild).toBeDefined();

  expect(screen.getByText("Value 1")).toBeInTheDocument();

  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(2);
  buttons.forEach((button) => {
    expect(button).toBeEnabled();
  });
  expect(container.firstChild).toMatchSnapshot();
});

test("Two Options No Value", () => {
  const { container } = render(<TwoOptionsNoValue />);

  expect(container.firstChild).toBeDefined();

  expect(screen.getByText("(None)")).toBeInTheDocument();

  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(2);
  buttons.forEach((button) => {
    expect(button).toBeEnabled();
  });
  expect(container.firstChild).toMatchSnapshot();
});

test("On Change Two Options", async () => {
  const test = jest.fn(),
    { container } = render(<OnChangeTwoOptions onChange={test} />);

  expect(container.firstChild).toBeDefined();

  await OnChangeTwoOptions.play({ canvasElement: container });

  expect(test).toHaveBeenCalled();
  expect(container.firstChild).toMatchSnapshot();
});

test("On Change Two Options Clear", async () => {
  const test = jest.fn(),
    { container } = render(<OnChangeTwoOptionsClear onChange={test} />);

  expect(container.firstChild).toBeDefined();

  await OnChangeTwoOptionsClear.play({ canvasElement: container });

  expect(test).toHaveBeenCalled();
  expect(container.firstChild).toMatchSnapshot();
});

test("On Change Options Select", async () => {
  const test = jest.fn(),
    { container } = render(<OnChangeOptionsSelect onChange={test} />);

  expect(container.firstChild).toBeDefined();

  await OnChangeOptionsSelect.play({ canvasElement: container });

  expect(test).toHaveBeenCalled();
  expect(container.firstChild).toMatchSnapshot();
});

test("On Change Options Type", async () => {
  const test = jest.fn(),
    { container } = render(<OnChangeOptionsType onChange={test} />);

  expect(container.firstChild).toBeDefined();

  await OnChangeOptionsType.play({ canvasElement: container });

  expect(test).toHaveBeenCalled();
  expect(container.firstChild).toMatchSnapshot();
});

test("On Change Multi Options", async () => {
  const test = jest.fn(),
    { container } = render(<OnChangeMultiOptions onChange={test} />);

  expect(container.firstChild).toBeDefined();

  await OnChangeMultiOptions.play({ canvasElement: container });

  expect(test).toHaveBeenCalled();
  expect(container.firstChild).toMatchSnapshot();
});

test("On Change Multi Options Select All", async () => {
  const test = jest.fn(),
    { container } = render(<OnChangeMultiOptionsSelectAll onChange={test} />);

  expect(container.firstChild).toBeDefined();

  await OnChangeMultiOptionsSelectAll.play({ canvasElement: container });

  expect(test).toHaveBeenCalled();
  expect(container.firstChild).toMatchSnapshot();
});

test("On Change Multi Options Deselect All", async () => {
  const test = jest.fn(),
    { container } = render(<OnChangeMultiOptionsDeselectAll onChange={test} />);

  expect(container.firstChild).toBeDefined();

  await OnChangeMultiOptionsDeselectAll.play({ canvasElement: container });

  expect(test).toHaveBeenCalled();
  expect(container.firstChild).toMatchSnapshot();
});
