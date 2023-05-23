import { useRouter } from 'next/router';
import React from 'react'
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import {
  Avatar,
  Button,
  Space,
  Typography
} from "antd";

const UserAvatar = () => {

  let session = useSessionContext();
  const { push: pushRoute } = useRouter();

  if (session.loading) {
    return null;
  }

  const avatarSrc = session.accessTokenPayload?.avatar ?? 'images/avatar-unknown.jpg'

  return (
    <React.Fragment>
      <Button
        onClick={() => pushRoute('/me')}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', height: 40 }}>
        {session.accessTokenPayload?.email && <Typography.Text strong>{session.accessTokenPayload?.email}</Typography.Text>}
        {<Avatar src={avatarSrc} alt='User Avatar' />}
      </Button>
    </React.Fragment>
  )
}

export default UserAvatar;