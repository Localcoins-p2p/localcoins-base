const ShadowBox: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <div className={` p-2 rounded-2xl ${className}`}>{children}</div>;
};

export default ShadowBox;
