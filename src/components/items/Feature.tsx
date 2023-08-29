import { useModelEditor } from "../../hooks/useModelEditor";
import { useValueEditor } from "../../hooks/useValueEditor";
import { useZustand } from "../../hooks/useZustand";
import { EditTextToggle, EditTextareaToggle } from "../edit/EditText";
import { Editable } from "../edit/Editable";
import { editToggleFactory } from "../factories/editFactories";

export function AddFeature({periodId}: {periodId: string}) {
  const storeFeature = useZustand(store => store.addFeature(periodId))
  const { content: {feature}, control } = useModelEditor({
    modelSetter: storeFeature,
    toggled: true
  })
  return <FeatureControl {...{ create: true, control, feature: {display: feature.value, edit: feature}}} />
}

export function EditFeature({ id }: Model) {
  const feature = useZustand(store => store.getFeature(id))
  const setFeature = useZustand(store => store.featureSetter(id))
  const { content, control } = useValueEditor(setFeature)
  return <FeatureControl {...{control, feature: {display: feature, edit: content}}} />
}

export function FeatureControl({ feature, control, create }: { feature: EditToggleProp<string> } & {
  control: EditControl
  create?: boolean
}) {
  return <Editable {...{ ...control, create }}>
    <EditTextareaToggle {...feature} />
  </Editable>
}
