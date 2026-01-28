interface StockLevelProps {
  className?: string
}

export default function StockLevel({ className }: StockLevelProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 21H3"></path>
      <path d="M18 11v10"></path>
      <path d="M9 11v10"></path>
      <path d="M4 11l4-6 4 6"></path>
      <path d="M14 11l4-6 4 6"></path>
    </svg>
  );
}
