import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => (
  <div className={`mx-auto max-w-4xl px-4 ${className}`}>
    {children}
  </div>
);

export default Container;