import { Header, HeaderLevelContext } from "./Header";


export function ProfileHeader({ id, img }: Model & {img:string} & React.Attributes) {
  return (
    <HeaderLevelContext.Provider value={{ level: 1 }}>
      <Header {...{
        id,
        modelType: 'profiles',
        before: (({ img }: { img: string } & React.Attributes) =>  (
          <div className="img-ctn">
            <img src={img} width={150} />
          </div>
        ))({img})
      }} />
    </HeaderLevelContext.Provider> 
  )
}
