import React from "react";

interface IProps {
  message?: string;
  className?: string;
}

export const ErrorMessage = ({ message = "", className }: IProps) => (
  <strong className={`block text-red-500 text-xl ${className}`}>
    {message}
  </strong>
);
