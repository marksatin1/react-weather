const Window = ({ title, className, onClick, children }) => {
  return (
    <div className={className} onClick={onClick}>
      <h5 className='title'>{title}</h5>
      <div className='children'>{children}</div>
    </div>
  );
};

export default Window;
