import prisma from '@/prisma/prisma';
import type * as Prisma from '@prisma/client';
import bcrypt from 'bcrypt';
import {
  isEmail,
  isNameValid,
  isPasswordValid,
} from '../../../utils/validation';
import jwt from 'jsonwebtoken';
import {
  ERROR,
  INCORRECT_OTP,
  PHONE_DOES_NOT_EXIST,
  RESET_PASSWORD_RESPONSE,
  SUCCESS,
  URL_EXPIRED_OR_INVALID,
  VERIFICATION_EMAIL_SENT,
} from '@/constants';
import {
  sendForgetPasswordEmail,
  sendVerificationEmail as sendVerification,
} from '@/server/services/email';
import { getPayload } from '@/server/services/token';
import { adminOnly, isLoggedIn } from '../../wrappers';
import { getRandomNumber } from '@/utils/generator';
import { PublicKey } from '@solana/web3.js';
import nacl from 'tweetnacl'; // For signature verification
import { IGqlContext } from '@/types';
import saveImages from '@/utils/saveImages';

type RegisterUserInput = Prisma.User & { password: string };
export const registerUser = async (_: unknown, args: RegisterUserInput) => {
  const password = args.password;
  const pwHash = await bcrypt.hash(password, 10);

  if (args.email) isEmail(args.email);
  isPasswordValid(args.password);
  isNameValid(args.name || '');

  const { password: _p, ...data } = args;

  return prisma.user.create({
    data: {
      ...data,
      pwHash,
    },
  });
};

type LoginUserInput = {
  publicKey: string;
  signedMessage: string;
  nonce: string;
};
export const login = async (
  _: unknown,
  { publicKey, signedMessage, nonce }: LoginUserInput
) => {
  const user = await prisma.user.findUnique({ where: { publicKey, nonce } });
  if (!user) {
    return {
      error: 'User not found',
    };
  }

  const parsedSignedMessage: any = JSON.parse(signedMessage);
  const message = new TextEncoder().encode(nonce);
  const signature = new Uint8Array(parsedSignedMessage.data);
  const publicKeyDecoded = new PublicKey(publicKey);

  const isVerified = nacl.sign.detached.verify(
    message,
    signature,
    publicKeyDecoded.toBytes()
  );

  if (isVerified) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
    return {
      user,
      token,
    };
  } else {
    return {
      error: 'Incorrect email or password',
    };
  }
};

export const generateNonce = async (
  _: unknown,
  { publicKey }: { publicKey: string }
) => {
  const nonce = Math.random().toString(36).substring(2);
  await prisma.user.upsert({
    where: { publicKey },
    create: {
      nonce,
      publicKey,
    },
    update: {
      nonce,
    },
  });
  return { nonce };
};

export const deleteUser = adminOnly(async (_: unknown, { id }) => {
  return prisma.user.delete({ where: { id } });
});

export const updateProfile = isLoggedIn(
  (_: unknown, { name, email }: Prisma.User, { user }: IGqlContext) => {
    return prisma.user.update({
      where: { id: user?.id },
      data: { name, email },
    });
  }
);

export const updateUser = isLoggedIn(
  async (
    _: unknown,
    {
      email,
      name,
      image,
      phone,
    }: Prisma.User & {
      image: string;
    },
    { user }: IGqlContext
  ) => {
    const data: any = { email, name, phone };

    let profileImage;
    if (image) {
      [profileImage] = await saveImages([image]);
    }
    if (profileImage) {
      data.profileImage = profileImage;
    }

    return prisma.user.update({
      where: { id: user?.id },
      data,
    });
  }
);
