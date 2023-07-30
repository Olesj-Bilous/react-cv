import { PeriodHeader } from "./Header.Period";


export function PeriodFeatures({ features, ...props }: Period & { features: PeriodFeature[] } & React.Attributes) {
  return (
    <article>
      <PeriodHeader {...props} />
      <ul>
        {
          features.map((feature) => (
            <li key={feature.id}>
              {feature.feature}
            </li>
          ))
        }
      </ul>
    </article>
  )
}
