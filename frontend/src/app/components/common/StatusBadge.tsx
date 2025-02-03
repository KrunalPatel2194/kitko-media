interface StatusBadgeProps {
    status: 'published' | 'draft';
  }
  
  export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const styles = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-gray-100 text-gray-800'
    };
  
    return (
      <span className={`px-2 py-1 rounded-full text-sm ${styles[status]}`}>
        {status}
      </span>
    );
  };