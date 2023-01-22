interface CheckBoxProps {
  title?: string;
  img?: string;
}

export default function CheckBox({ title, img }: CheckBoxProps) {
  return (
    <div className="block">
      <label className="flex flex-row items-center">
        {/* <div>
          <input type="checkbox" className="form-checkbox"></input>
        </div> */}
        {/* <div>
          <img src={img} alt="" />
        </div> */}
        {/* <div className="ml-2 font-roboto">
          <p className="font-bold text-sm">Available pay over the time</p>
          <p className="text-xs">As low as $30/mo or 0% APR.</p>
        </div> */}
      </label>
    </div>
  );
}
