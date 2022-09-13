function Button({ children, icon, showText }) {
  return (
    <div
      className={`flex font-medium-font text-sm gap-2 items-center p-2.5 bg-pink w-fit rounded-full`}
    >
      {showText && <p> {children} </p>}
      {icon}
    </div>
  );
}

export default Button;
