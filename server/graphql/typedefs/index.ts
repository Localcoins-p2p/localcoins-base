import { gql } from 'graphql-tag';
import projectTypedefs from './project';

const typeDefs = gql`
  scalar Date

  type User {
    id: String!
    name: String
    email: String
    address: String
    state: String
    country: String
    isAdmin: Boolean
    publicKey: String
  }

  type Sale {
    id: ID!
    amount: Float
    unitPrice: Float
    screenshotMehtods: [String]
    seller: User
    buyer: User
    createdAt: Date
    tx: String
  }

  type LoginResponse {
    token: String
    error: String
    user: User
  }

  type StatusResponse {
    message: String
    status: String!
  }
  type MessageResponse {
    message: String!
  }

  type NonceResponse {
    nonce: String
    error: String
  }

  type SaleResponse {
    sales: [Sale]
  }

  type Query {
    user: User
    sales: SaleResponse
  }
  type Mutation {
    registerUser(
      name: String!
      email: String!
      address: String
      state: String
      country: String
      password: String!
    ): User
    login(
      publicKey: String!
      nonce: String!
      signedMessage: String!
    ): LoginResponse!
    sendResetPasswordLink(email: String!): MessageResponse!
    resetPassword(password: String!, token: String!): StatusResponse!
    sendVerificationEmail(email: String!): MessageResponse!
    verifyEmail(token: String!): StatusResponse!
    updateAdminStatus(userId: String!, status: Boolean): User
    deleteUser(id: String!): User
    generateNonce(publicKey: String!): NonceResponse

    sendPhoneOtp(phoneNo: String): StatusResponse
    phoneOtpLogin(otp: String, phoneNo: String): LoginResponse!

    createSale(
      amount: Float
      unitPrice: Float
      screenshotMethods: [String]
      tx: String
    ): Sale
  }

  ${projectTypedefs}
`;

export default typeDefs;
