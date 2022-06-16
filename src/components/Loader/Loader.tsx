import loadingImg from './oval.svg'

interface PropsType {
  title?: string
  className?: string
}

export function Loader({title, className = ''}: PropsType) {
  return (
    <div className={`loader ${className}`}>
      { title ? title : <img src={loadingImg} alt="loading" />}
    </div>
  )
}
