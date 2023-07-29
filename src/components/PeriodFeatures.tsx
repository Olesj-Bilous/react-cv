import { PeriodHeader } from "./PeriodHeader";


export function PeriodFeatures({ features, ...props }: Period & { features: string[] } & React.Attributes) {
  return (
    <article>
      <PeriodHeader {...props} />
      <ul>
        {
          features.map((feature, index) => (
            <li key={index}>
              {feature}
            </li>
          ))
        }
      </ul>
    </article>
  )
}
