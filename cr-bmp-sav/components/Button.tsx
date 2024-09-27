type ButtonProps = {
    children: React.ReactNode,
    onClick?: () => void
}

/**
 * @description Button component
 * @param {React.ReactNode} props.children
 * @param {() => void} props.onClick
 * @returns 
 */
const Button = (props: ButtonProps) => {
  return (
    <button className={"appBtn"} onClick={props.onClick}>{props.children}</button>
  )
}

export default Button