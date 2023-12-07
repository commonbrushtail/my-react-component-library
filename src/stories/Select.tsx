import React from "react";
import { useState,useEffect,useRef } from 'react';
interface SelectProps {
    mobileMode?: 'native' | 'popup',
    lists?: string[],
    placeholder?: string,
    optionListMaxHeight?:number,
}


export const Select = ({ mobileMode = 'native', lists = ['0'],optionListMaxHeight = 200, ...props }: SelectProps) => {
    const [selectOpen, setSelectOpen] = useState<boolean>(false)
    const [selectValue, setSelectValue] = useState<string>()
    const wrapperRef = useRef<HTMLDivElement>(null);
    const ulRef = useRef<HTMLUListElement>(null)
    const handleWrapperClick = (e)=>{
        
        setSelectOpen(true)
    }

    const handleClickOutSide = (e :MouseEvent)=>{
        const mouseTarget = e.target as Element

        if(wrapperRef.current && !wrapperRef.current.contains(mouseTarget)){
        setSelectOpen(false)
        
    
    }

    


      
    }
    const handleListClick = (itemValue)=>{
        // setSelectValue(itemValue)
        
    }


    useEffect(()=>{
        document.addEventListener('mousedown',handleClickOutSide)

        return ()=>{
            document.removeEventListener('mousedown',handleClickOutSide)
        }
    },[])


    return (
        <div ref={wrapperRef} onClick={handleWrapperClick}  className="relative w-max">
            <div    className="border shadow w-max py-1 pl-2 pr-5 relative flex items-center rounded cursor-pointer">
                <div>{selectValue}</div>
                <div className="
                    w-0 h-0 absolute right-[5px] top-1/2 -translate-y-[50%]
                    border-l-[4px] border-l-transparent
                    border-t-[4px] border-t-black
                    border-r-[4px] border-r-transparent">
                </div>
                
               
                </div>
                <ul ref={ulRef}  style={{ display: selectOpen ? 'block' : 'none',maxHeight:`${optionListMaxHeight}px`, }} className={`absolute top-[100%] left-0 w-max border bg-white  rounded py-2 shadow overflow-y-scroll  `}>
                {props.placeholder && <li className="text-gray-300 px-2">{props.placeholder}</li>}
                {lists.map((item,index)=>{
                return (
                    
                    <li  className="cursor-pointer hover:bg-gray-100 px-2" key={index}>{item}</li>
                )
            })}
                </ul>

              

            {/* <select className="ring-0 h-9 shadow">

            {props.placeholder && <option  selected hidden disabled>{props.placeholder}</option>}
            {lists.map((item,index)=>{
                return (
                    
                    <option key={index}>{item}</option>
                )
            })}
        </select> */}
        </div>
    )
}