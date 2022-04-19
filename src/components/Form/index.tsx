import * as AuthSession from 'expo-auth-session';
import React, { useState } from 'react';
import { Button } from '../Button';
import { User, UserProps } from '../User';
import { Container } from './styles';

type AuthResponse = {
  params: {
    access_token: string;
  };
  type: string;
};

export function Form() {
  const [userData, setUserData] = useState<UserProps>({} as UserProps);

  async function handleGoogleSignIn() {
    try {
      const CLIENT_ID =
        '271205278142-7p23qkd1est0s8k0ikji0jc6iot67hog.apps.googleusercontent.com';
      const REDIRECT_URI = 'https://auth.expo.io/@rafael.sousa/formapp';
      const SCOPE = encodeURI('profile email');
      const RESPONSE_TYPE = 'token';

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=${RESPONSE_TYPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthResponse;

      if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${params.access_token}`);
        const user = await response.json();
        setUserData(user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Button
        onPress={handleGoogleSignIn}
        icon="google"
        title="Entrar com Google"
      />

      <User user={userData} />
    </Container>
  );
}
