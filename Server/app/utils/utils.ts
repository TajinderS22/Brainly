
export const random=(len: number)=>{
    let options='qweruoitrpykhgasdfasdlzxm243567234216890231jghsbvj-fbnncbm827190'
    let ans=''
    let length=options.length
    for(let i=0;i<len;i++){
        ans+=options[Math.floor(Math.random()*length)]
    }
    return ans
}