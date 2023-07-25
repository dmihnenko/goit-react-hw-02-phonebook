import React from 'react';
import PropTypes from 'prop-types';
import { FriendListContainer, Span } from './List.styled';
import FriendItem from 'components/ListItem/ListItem';

function FriendList({ friends, deleteContactById }) {
  return (
    <>
      <Span>Your contacts:</Span>
      {friends.length === 0 ? (
        <p>No item found</p>
      ) : (
        <FriendListContainer>
          {friends.map(friend => (
            <FriendItem
              friend={friend}
              deleteContactById={deleteContactById}
              key={friend.id}
            />
          ))}
        </FriendListContainer>
      )}
    </>
  );
}

FriendList.propTypes = {
  friends: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
    })
  ).isRequired,
  // onDeleteFriend: PropTypes.func.isRequired,
};

export default FriendList;
