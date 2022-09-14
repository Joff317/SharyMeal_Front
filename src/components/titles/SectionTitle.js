function SectionTitle({ children, textCenter }) {
  return (
    <h1
      className={`font-bookmania-bold-font ${
        textCenter && "text-center"
      } color-black text-4xl`}
    >
      {" "}
      {children}{" "}
    </h1>
  );
}

export default SectionTitle;
