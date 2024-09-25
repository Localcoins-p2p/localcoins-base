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
import { adminOnly } from '../../wrappers';
import { getRandomNumber } from '@/utils/generator';
import { PublicKey } from '@solana/web3.js';
import nacl from 'tweetnacl'; // For signature verification

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
  const parsedSignedMessage: any = JSON.parse(signedMessage);
  // const user = await prisma.user.findUnique({ where: { publicKey } });
  // if (!user) {
  //   return {
  //     error: 'Something is wrong',
  //   };
  // }

  const message = new TextEncoder().encode(nonce);
  const signature = new Uint8Array(parsedSignedMessage.data);
  const publicKeyDecoded = new PublicKey(publicKey);

  const isVerified = nacl.sign.detached.verify(
    message,
    signature,
    publicKeyDecoded.toBytes()
  );

  console.log('Is Verified', isVerified);

  if (true) {
    //const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
    // return {
    //   user,
    //   token,
    // };
  } else {
    return {
      error: 'Incorrect email or password',
    };
  }
};

export const deleteUser = adminOnly(async (_: unknown, { id }) => {
  return prisma.user.delete({ where: { id } });
});
