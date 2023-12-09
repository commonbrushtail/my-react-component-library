import { ChangeEvent,MouseEvent } from "react";
import { useState, useEffect, useRef } from 'react';
import { getMobileOperatingSystem } from "../utilities/getUserAgentMobile";
interface SelectProps {
    maxWidth?: number,
    lists?: string[],
    placeholder?: string,
    optionListMaxHeight?: number,
    defaultValue:string,
    onChange: (value: string) => void,

}


export const Select = ({ lists = ['0'], optionListMaxHeight,defaultValue, onChange, maxWidth, ...props }: SelectProps) => {
    const [selectOpen, setSelectOpen] = useState<boolean>(false)
    const [selectValue, setSelectValue] = useState<string>(defaultValue ? defaultValue : "")
    const wrapperRef = useRef<HTMLDivElement>(null);
    const desktopListRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const handleWrapperClick = () => {
        setSelectOpen(true)
    }





    const handleClickOutside = (e: globalThis.MouseEvent) => {
        const mouseTarget = e.target as Element;
    
        if (wrapperRef.current && !wrapperRef.current.contains(mouseTarget) && !desktopListRef.current?.contains(mouseTarget)) {
            setSelectOpen(false);
        }
    };
    const handleInputClick = (e:MouseEvent<HTMLInputElement>) => {
        // This function now only handles clicks
       console.log('input click',e) 
        const target = e.target as HTMLInputElement;
        const newValue  = target.value
        console.log('change:', e.type);
        setSelectValue(newValue);
        setSelectOpen(false);
        onChange(newValue);
    };

    const handleChangeSelect = (e:ChangeEvent<HTMLSelectElement>) =>{
        setSelectValue(e.target.value)
        setSelectOpen(false)
        onChange(e.target.value)
    }
    const handleKeyboardNavigation = (e: React.KeyboardEvent<HTMLInputElement>) => {
     
       
        if (e.key === 'Enter') {
            setSelectValue(e.currentTarget.value);
            setSelectOpen(false);
            onChange(e.currentTarget.value);
        }
    };


    useEffect(() => {
        const mobileOS = getMobileOperatingSystem();
        const isMobileOS = mobileOS === 'Android' || mobileOS === 'iOS';
        setIsMobile(isMobileOS);
        console.log("Is Mobile: ", isMobileOS); // Add this line to check the value

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])


    return (



        <div className="relative w-max">
            <div ref={wrapperRef} onClick={handleWrapperClick} className="border shadow w-max py-1 pl-2 pr-5 relative flex items-center rounded cursor-pointer">
                <div style={{ maxWidth: maxWidth ? maxWidth : 'none' }} className="truncate">
                    { !selectValue ?  (<span className="text-gray-600">{props.placeholder}</span> )
                : <p>{selectValue}</p>    
                }
                    
                    </div>
                <div className="
                    w-0 h-0 absolute right-[5px] top-1/2 -translate-y-[50%]
                    border-l-[4px] border-l-transparent
                    border-t-[4px] border-t-black
                    border-r-[4px] border-r-transparent">
                </div>

                {isMobile && (
                    (
                        <select value={selectValue} onChange={handleChangeSelect} className="ring-0 h-9 shadow absolute left-0 w-full opacity-0">
                            {props.placeholder && <option disabled>{props.placeholder}</option>}
                            {lists.map((item, index) => (
                                <option value={item} key={index}>{item}</option>
                            ))}
                        </select>
                    )
                )}


            </div>


            {!isMobile && (
            <div ref={desktopListRef} style={{ display: selectOpen ? 'block' : 'none', maxHeight: `${optionListMaxHeight}px` }}
                className={`absolute top-[100%] left-0 w-max border bg-white rounded py-2 shadow overflow-y-auto`}>
                 {props.placeholder && (
                        <label className    ="block text-gray-300 px-2 relative overflow-hidden ">
                            <input className="absolute left-[-9999px]" type="radio" name="select" value="" disabled checked={!selectValue} />
                            {props.placeholder}
                        </label>
                    )}
                 {lists.map((item, index) => (
                        <label key={index} className="block cursor-pointer hover:bg-gray-100 px-2 overflow-hidden relative label-focus-within">
                            <input className="w-full absolute h-full opacity-0 left-0"  type="radio" name="select" value={item}  onMouseDown={handleInputClick}  onKeyDown={handleKeyboardNavigation} />
                            {item}
                        </label>
                    ))}
            </div>
        )}





        </div>
    )
}