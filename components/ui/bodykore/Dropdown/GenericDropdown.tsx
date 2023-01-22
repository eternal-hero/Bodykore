interface GenericDropdownProps {
    values: (string | number)[]
}

export default function GenericDropdown({
    values
}: GenericDropdownProps) {
    return (
        <div className="relative">
            <select className="block appearance-none w-full text-gray-700 py-2 px-4 pr-8 leading-tight" id="grid-product-type">
                {values.map((v, i) => {
                    return (
                    <option key={i}>{v}</option>
                    )
                })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>  
    )
}