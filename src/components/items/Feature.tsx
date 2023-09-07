import { useModelEditor } from "../../hooks/useModelEditor";
import { useValueEditor } from "../../hooks/useValueEditor";
import { useZustand } from "../../hooks/useZustand";
import { EditTextareaToggle } from "../primitives/EditText";
import { Editable } from "../editable/Editable";

export function AddFeature({periodId}: {periodId: string}) {
  const storeFeature = useZustand(store => store.addFeature(periodId))
  const { map: {feature}, control } = useModelEditor({
    modelSetter: storeFeature,
    toggled: true
  })
  return <FeatureControl {...{ create: true, control, feature}} />
}

export function EditFeature({ id }: Model) {
  const feature = useZustand(store => store.getFeature(id))
  const {set} = useZustand(store => store.featureSetter(id))
  const { content, control } = useValueEditor({globalValue: [feature, set]})
  return <FeatureControl {...{control, feature: content}} />
}

export function FeatureControl({ feature, control, create }: { feature: HookedValue<string> } & {
  control: EditControl
  create?: boolean
}) {
  return <Editable {...{ ...control, create }}>
    <EditTextareaToggle state={feature} />
  </Editable>
}
