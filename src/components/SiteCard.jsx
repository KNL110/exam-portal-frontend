export const SiteCard = ({ children, id }) => {
  const styles = {
    marginTop: '50px'
  };

  return (
    <div className="container">
      <div id={id} style={styles}>
        {children}
      </div>
    </div>
  );
};
