import * as React from "react";
import Tabs from ".";

export default {
  title: "Components/Utils/Tab",
  component: Tabs,
};

export const Example = () => {
  const [value, setValue] = React.useState(0);
  const options = {
    data: [{ text: "日別" }, { text: "月別" }],
  };

  return <Tabs {...options} value={value} onChange={setValue} />;
};

export const WithBadge = () => {
  const [value, setValue] = React.useState(0);
  const options = {
    data: [
      { text: "全て", count: 5 },
      { text: "ユニット", count: 5 },
      { text: "サイズ", count: 5 },
    ],
  };

  return (
    <Tabs {...options} value={value} withBadge={true} onChange={setValue} />
  );
};
