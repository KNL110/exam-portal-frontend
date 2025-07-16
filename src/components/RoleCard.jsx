import { Children } from "react";

export const RoleCard = ({ role, message, onClick, children }) => {
  return (
    <div
      className="card"
      onClick={onClick}
      style={{
        textAlign: 'center',
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      <h3 style={{ color: '#2e7d32', marginBottom: '15px' }}>{role}</h3>
      {children}
      <p>{message}</p>
    </div>
  );
};

