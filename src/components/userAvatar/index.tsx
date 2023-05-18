import { useRouter } from 'next/router';
import React from 'react'
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import {
  Avatar,
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
      <Space
        style={{ marginLeft: "8px", cursor: "pointer" }}
        size="middle"
        onClick={() => pushRoute('/profile')}>
        {session.accessTokenPayload?.email && <Typography.Text strong>{session.accessTokenPayload?.email}</Typography.Text>}
        {<Avatar src={avatarSrc} alt='User Avatar' />}
      </Space>
    </React.Fragment>
  )
}

export default UserAvatar;