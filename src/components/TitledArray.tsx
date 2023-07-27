

export function TitledArray<TProps extends Model>({ title, items, Component }: TitledArray<TProps> & { Component: ({...props}: TProps & React.Attributes) => JSX.Element}) {
  return (
    <section>
      <h3>
        {title}
      </h3>
      <div className="items">
        {
          items.map((item, itemIndex) => (
            <Component key={item.id} {...item} />
          ))
        }
      </div>
    </section>
  )
}
