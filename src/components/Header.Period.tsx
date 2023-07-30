import { Header } from "./Header";
import { Period } from "./Period";

export function PeriodHeader({ id }: Model & React.Attributes) {
  return (
    <Header {...{ id, modelType: 'periods', after: <Period {...{ id }} /> }}  />
  )
}
