import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { Title, ArgsTable, Stories } from "@storybook/addon-docs";
import FullSizeConfirmModal, {
  FullSizeConfirmModalProps,
} from "./FullSizeConfirmModal";
import { action } from "@storybook/addon-actions";
import Button from "../Button";
import DataTable from "../DataTable";
import { data } from "../DataTable/mockData";
import Spacer from "../Spacer";
import ActionButton from "../ActionButton";

export default {
  title: "Components/Utils/FullSizeConfirmModal",
  component: FullSizeConfirmModal,
  args: {
    isOpen: false,
    title: "Title",
  },
  parameters: {
    docs: {
      source: { type: "code" },
      page: () => (
        <>
          <Title />
          <ArgsTable of={FullSizeConfirmModal} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

const Template: Story<FullSizeConfirmModalProps> = (args) => {
  const [isOpen, setIsOpen] = React.useState(args.isOpen);
  const handleToggleButton = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Button onClick={handleToggleButton}>Open Modal</Button>
      <FullSizeConfirmModal
        onClose={handleToggleButton}
        {...args}
        isOpen={isOpen}
      >
        {args.children}
      </FullSizeConfirmModal>
    </>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  children: "Content",
  onSubmit: action("submitted"),
};

export const WithOneSubAction = Template.bind({});
WithOneSubAction.args = {
  children: "Content",
  onSubmit: action("submitted"),
  subActions: [
    <ActionButton icon="export" type="button" onClick={action(`clicked "Add"`)}>
      Add
    </ActionButton>,
  ],
};

export const WithTwoSubActions = Template.bind({});
WithTwoSubActions.args = {
  children: "Content",
  onSubmit: action("submitted"),
  subActions: [
    <ActionButton icon="export" type="button" onClick={action(`clicked "Add"`)}>
      Add
    </ActionButton>,
    <ActionButton
      icon="export"
      type="button"
      onClick={action(`clicked "Download"`)}
    >
      Download
    </ActionButton>,
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  children: "Content",
  onSubmit: () => {},
  loading: true,
};

export const OverflowYScroll = Template.bind({});
OverflowYScroll.args = {
  children: (
    <>
      <Spacer my={3} />
      <DataTable
        data={data}
        columns={[
          {
            name: "ID",
            selector: (data) => data.id,
          },
          {
            name: "name",
            selector: (data) => data.date,
          },
        ]}
      />
    </>
  ),
  onSubmit: action("submitted"),
  overflowYScroll: true,
};

export const WithoutFooter = Template.bind({});
WithoutFooter.args = {
  children: "Content",
  onSubmit: undefined,
};
