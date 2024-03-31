export default function PokemonThumbnail(props: { name: string, id: string}) {

  // 全体をリンクにしたい
  return (
    <div>
      <p>{props.name}</p>
      <p>{props.id}</p>
    </div>
  )
}
