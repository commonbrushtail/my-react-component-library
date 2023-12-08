import React from "react";
import { useState, useEffect, useRef } from 'react';
import { getMobileOperatingSystem } from "../utilities/getUserAgentMobile";
interface SelectProps {
    maxWidth?: number,
    lists?: string[],
    placeholder?: string,
    optionListMaxHeight?: number,
    value?: string,
    onChange: (value: string) => void,

}


export const Select = ({ lists = ['0'], optionListMaxHeight = 200, onChange, maxWidth, ...props }: SelectProps) => {
    const [selectOpen, setSelectOpen] = useState<boolean>(false)
    const [selectValue, setSelectValue] = useState<string>()
    const wrapperRef = useRef<HTMLDivElement>(null);
    const ulRef = useRef<HTMLUListElement>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const handleWrapperClick = () => {
        setSelectOpen(true)
    }

    const handleClickOutSide = (e: MouseEvent) => {
        const mouseTarget = e.target as Element

        if (wrapperRef.current && !wrapperRef.current.contains(mouseTarget) && !ulRef.current?.contains(mouseTarget)) {

            setSelectOpen(false)


        }




    }
    const handleListClick = (itemValue: string) => {
        onChange(itemValue);
        setSelectValue(itemValue)
        setSelectOpen(false)


    }


    useEffect(() => {
        const mobileOS = getMobileOperatingSystem();
        const isMobileOS = mobileOS === 'Android' || mobileOS === 'iOS';
        setIsMobile(isMobileOS);
        console.log("Is Mobile: ", isMobileOS); // Add this line to check the value

        document.addEventListener('mousedown', handleClickOutSide)

        return () => {
            document.removeEventListener('mousedown', handleClickOutSide)
        }
    }, [])


    return (



        <div className="relative w-max">
            <div ref={wrapperRef} onClick={handleWrapperClick} className="border shadow w-max py-1 pl-2 pr-5 relative flex items-center rounded cursor-pointer">
                <div style={{ maxWidth: maxWidth ? maxWidth : 'none' }} className="truncate">{selectValue ? selectValue : props.placeholder}</div>
                <div className="
                    w-0 h-0 absolute right-[5px] top-1/2 -translate-y-[50%]
                    border-l-[4px] border-l-transparent
                    border-t-[4px] border-t-black
                    border-r-[4px] border-r-transparent">
                </div>


            </div>


            {isMobile ? (
            <select className="ring-0 h-9 shadow">
                {props.placeholder && <option  hidden disabled>{props.placeholder}</option>}
                {lists.map((item, index) => (
                    <option key={index}>{item}</option>
                ))}
            </select>
        ) : (
            <ul ref={ulRef} style={{ display: selectOpen ? 'block' : 'none', maxHeight: `${optionListMaxHeight}px` }}
                className={`absolute top-[100%] left-0 w-max border bg-white rounded py-2 shadow overflow-y-scroll`}>
                {props.placeholder && <li className="text-gray-300 px-2">{props.placeholder}</li>}
                {lists.map((item, index) => (
                    <li onClick={() => handleListClick(item)} className="cursor-pointer hover:bg-gray-100 px-2" key={index}>{item}</li>
                ))}
            </ul>
        )}





        </div>
    )
}