'use client'

import { FC } from "react";
import { MdClose } from "react-icons/md";
import Select, { MultiValue } from "react-select";

interface Props {
    isHidden: boolean;
    toggle: ()=>void;
}

const MedicineDispenser: FC<Props> = ({ isHidden, toggle }) => {
    return(
        <div className={`${isHidden ? 'hidden' : 'w-full h-full fixed bg-black flex justify-center items-center'}`}>
            <section className="w-full md:w-96 rounded-lg bg-white p-5">
                <header className="mb-5 flex justify-between items-center">
                    <h1 className="text-xl font-bold">Dispense Medicine</h1>
                    <button onClick={toggle} className="p-2 rounded border-white hover:border-rose-400 hover:text-rose-400 active:ring-2 ring-rose-400">
                        <MdClose />
                    </button>
                </header>
                <form>
                    <div className="w-full">
                        <label htmlFor="" className="text-xs font-bold">Medicine:</label>
                        <Select 
                            isMulti
                        />
                    </div>
                </form>
            </section>
        </div>
    )
}

export default MedicineDispenser