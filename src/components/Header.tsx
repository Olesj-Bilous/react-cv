

export function Header({ title, subtitle, introduction }: HeaderProps & React.Attributes) {
  return (
    <>
      <div className="title-container">
        <div className="title">
          {title}
        </div>
        {
          subtitle && (
            <div className="subtitle">
              {subtitle}
            </div>
          )
        }
      </div>
      {
        introduction && (
          <div className="introduction">
            {introduction}
          </div>
        )
      }
    </>
  );
}
