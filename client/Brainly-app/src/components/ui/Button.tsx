import { type ReactElement } from 'react'


export interface ButtonProps{
    varients:"primary"|"secondary";
    size:"sm"|'lg'|'md';
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?:()=> void;

}

const varientStyles={
  'primary':"bg-[#5046e4] text-white",
  'secondary':'bg-[#e3e0ff] text-[#5046e4]'
}
const sizeVariations={
  "sm":"text-sm ",
  "md":"sm:text-md text-sm",
  "lg":"sm:text-lg text-sm"
}
const hoverStyles={
  'primary':"shadow-[#e3e0ff] hover:shadow-lg hover:-translate-y-1 text-white duration-220 transform",
  'secondary':'shadow-[#5046e4] hover:shadow-md text-[#5046e4] hover:-translate-y-1 duration-220 transform '
}
const DefaultStyle='flex font-normal  items-center max-h-12 py-1 px-2 rounded-lg m-2  '


const Button = (props:ButtonProps) => {
  return (
    <button
      className={`${varientStyles[props.varients]} 
        
        ${hoverStyles[props.varients]}
        ${DefaultStyle}
        ${sizeVariations[props.size]}
        
      `}
      onClick={()=>{
        if(props.onClick){
          props.onClick()
        }
      }}
    >
      <div className={`mx-1 `}>{props.startIcon}</div>
      <div className='mx-1  '>{props.text}</div>
      <div className={`mx-1  ${props.endIcon&&"pr-1"} `} >{props.endIcon}</div>
    </button>
  )
}

export default Button