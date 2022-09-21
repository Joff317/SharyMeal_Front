function Button({ children, icon, showText, showIcon, showIconLeft }) {
  return (
    <div
      className={`flex font-medium-font text-black text-sm gap-2 items-center p-2.5 bg-pink w-fit rounded-full cursor-pointer`}
    >
      {showIconLeft && icon}
      {showText && <p> {children} </p>}
      {showIcon && icon}
    </div>
  );
}

export default Button;
