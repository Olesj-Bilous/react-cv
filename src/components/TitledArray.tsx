

export function TitledArray<TProps extends Model>({ title, items, Component }: TitledArray<TProps> & { Component: ({...props}: TProps & React.Attributes) => JSX.Element}) {
  return (
    <section>
      <h3>
        {title}
      </h3>
      <ul>
        {
          items.map((item, itemIndex) => (
            <li key={itemIndex}>
              <Component {...item} />
            </li>
          ))
        }
      </ul>
    </section>
  )
}
