import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  let avatarName = name.split(' ')[0][0];

  if (typeof(name.split(' ')[1]) !== 'undefined') {
    avatarName += name.split(' ')[1][0];
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${avatarName}`,
  };
}

interface PatientAvatarProps {
  name: string,
}

const PatientAvatar = ({ name }: PatientAvatarProps) => {
  return (
    <Avatar {...stringAvatar(name)} sx={{ width: 192, height: 192, fontSize: 64 }} />
  );
}

export default PatientAvatar;