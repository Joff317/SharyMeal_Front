import "./layout-blur.css";

function LayoutBlur({ children }) {
  return (
    <div
      id="beforeEl"
      className="flex items-center justify-center h-screen w-screen z-10 fixed top-0 left-0 "
    >
      <div className="bg-white border shadow-2xl border-black opacity-100 absolute top-[50%] left-[50%] py-10 px-28 rounded-2xl translate-x-[-50%] translate-y-[-50%]">
        {children}
      </div>
    </div>
  );
}
export default LayoutBlur;
