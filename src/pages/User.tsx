import React from 'react'
import { Link, useParams } from 'react-router';

type UserProps = {
  onRemoveUser: (userId: string | undefined) => void;
};

export const User = ({ onRemoveUser }: UserProps) => {
  const { userId } = useParams();

  return (
    <div className='border'>
      <h2>User: {userId}</h2>
      <button type="button" className="bg-emerald-400" onClick={() => onRemoveUser(userId)}>
        Remove
      </button>
      <Link to="/users" className='bg-amber-300'>Back to Users</Link>
    </div>
  );
}
