function Button({ children, icon, showText, showIcon }) {
  return (
    <div
      className={`flex font-medium-font text-sm gap-2 items-center p-2.5 bg-pink w-fit rounded-full`}
    >
      {showText && <p> {children} </p>}
      {showIcon && icon}
    </div>
  );
}

export default Button;
