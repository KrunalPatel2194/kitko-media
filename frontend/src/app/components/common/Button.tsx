interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    icon?: React.ReactNode;
  }
  
  export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    children,
    icon,
    className = '',
    ...props
  }) => {
    const baseStyles = "p-2 rounded-md transition-colors";
    const variants = {
      primary: "text-[#AE8766] hover:text-[#8e6d52]",
      secondary: "border text-gray-700 hover:bg-gray-50",
      danger: "text-red-600 hover:text-red-700"
    };
  
    return (
      <button 
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {icon || children}
      </button>
    );
  };
  