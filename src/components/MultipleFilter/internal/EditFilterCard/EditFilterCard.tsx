import * as React from "react";
import { useTheme } from "styled-components";
import Button from "../../../Button";
import { Divider } from "../../../Divider/styled";
import Icon from "../../../Icon";
import Select, { OptionType } from "../../../Select";
import Spacer from "../../../Spacer";
import Typography from "../../../Typography";
import {
  FilterPackType,
  FilterType,
  ReferedFilterType,
  Types,
} from "../../types";
import * as Styled from "./styled";
import { useForm } from "react-hook-form";
import TextField from "../../../TextField";
import ErrorText from "../../../ErrorText";
import RadioButton from "../../../RadioButton";

export type Props = {
  onClose: () => void;
  onEdit: (editedReferedFilter: ReferedFilterType) => void;
  willEditFilter?: ReferedFilterType;
  selectedFilterPack?: FilterPackType;
  sectionTitle: string | undefined;
  conditionTitle: string | undefined;
  editButtonTitle: string | undefined;
};

type FormType = {
  section: string;
  condition: string;
};

export const EditFilterCard: React.FunctionComponent<Props> = ({
  onClose,
  onEdit,
  willEditFilter,
  selectedFilterPack,
  sectionTitle,
  conditionTitle,
  editButtonTitle,
}) => {
  const theme = useTheme();
  const { register, setValue, handleSubmit, errors } = useForm({
    shouldUnregister: false,
    defaultValues: {
      section: willEditFilter?.filterName,
      condition: willEditFilter?.filterCondtion,
    },
  });
  const [submitError, setSubmitError] = React.useState<string | undefined>(
    undefined,
  );

  const handleSelect = (option: OptionType<any>) => {
    if (option === null) {
      setValue("condition", undefined);
    } else {
      setValue("condition", option.value);
    }
  };

  const getInputField = (filter: FilterType) => {
    const type = filter?.control.type;
    switch (type) {
      case "text":
        return (
          <TextField
            inputRef={register({ required: true })}
            name="condition"
            errorText={errors.condition ? "Please input" : ""}
          />
        );
      case "select":
        const options = filter?.control.options as string[];

        return (
          <Select
            options={options.map((option) => ({
              label: option,
              value: option,
            }))}
            defaultValue={{
              label: willEditFilter?.filterCondtion as string,
              value: willEditFilter?.filterCondtion as string,
            }}
            onChange={handleSelect}
          />
        );
      case "boolean":
        return (
          <div>
            <RadioButton
              defaultChecked={willEditFilter?.filterCondtion as boolean}
              inputRef={register()}
              name="condition"
              value="true"
            >
              true
            </RadioButton>
            <br />
            <RadioButton
              defaultChecked={willEditFilter?.filterCondtion as boolean}
              inputRef={register()}
              name="condition"
              value="false"
            >
              false
            </RadioButton>
          </div>
        );
    }
  };

  const onSubmit = (data: FormType) => {
    if (data.condition) {
      setSubmitError(undefined);
    } else {
      setSubmitError("Please set the section and condition.");
      return;
    }

    const editedFilter: ReferedFilterType = {
      filterCondtion: data.condition,
      filterType: willEditFilter?.filterType as Types,
      filterName: willEditFilter?.filterName as string,
      categoryName: willEditFilter?.categoryName as string,
    };
    onEdit(editedFilter);
  };

  return (
    <Styled.FilterCard>
      <Styled.FilterCardHeader>
        <Typography weight="bold" size="xxl">
          {willEditFilter?.categoryName}
        </Typography>

        <Spacer pr={2} />
        <Styled.CloseIconContainer key={"close"} onClick={onClose}>
          <Icon name="close" size="md" color={theme.palette.black} />
        </Styled.CloseIconContainer>
      </Styled.FilterCardHeader>
      <Styled.FilterContent>
        <Typography weight="bold" size="lg">
          {sectionTitle ?? "Section"}
        </Typography>
        <Spacer py={0.5} />
        <TextField readOnly value={willEditFilter?.filterName} />
        <Spacer py={1} />
        <Typography weight="bold" size="lg">
          {conditionTitle ?? "Condition"}
        </Typography>
        <Spacer py={0.5} />
        {getInputField(
          selectedFilterPack?.filters.find(
            (filter) => filter.filterName === willEditFilter?.filterName,
          ) as FilterType,
        )}
        <Spacer py={1} />
        <Divider
          orientation="horizontal"
          color={theme.palette.divider}
          my={2}
        />

        {submitError && (
          <Spacer py={2}>
            <ErrorText>{submitError}</ErrorText>
          </Spacer>
        )}

        <Styled.ButtonContainer>
          <Button size="small" inline={true} onClick={handleSubmit(onSubmit)}>
            {editButtonTitle ?? "Edit"}
          </Button>
        </Styled.ButtonContainer>
      </Styled.FilterContent>
    </Styled.FilterCard>
  );
};
