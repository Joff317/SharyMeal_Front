import "./layout-blur.css";

function LayoutBlur({ children }) {
  return (
    <div
      id="beforeEl"
      className="flex items-center justify-center h-screen w-screen z-50 fixed top-0 left-0"
    >
      <div className="open-popup bg-white border shadow-2xl border-black opacity-100 z-50 relative py-10 px-28 rounded-2xl ">
        {children}
      </div>
    </div>
  );
}
export default LayoutBlur;
