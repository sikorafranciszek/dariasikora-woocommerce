import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './prisma';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Możesz włączyć później
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  user: {
    additionalFields: {
      phone: {
        type: 'string',
        required: false,
      },
      company: {
        type: 'string',
        required: false,
      },
      address1: {
        type: 'string',
        required: false,
      },
      address2: {
        type: 'string',
        required: false,
      },
      city: {
        type: 'string',
        required: false,
      },
      postcode: {
        type: 'string',
        required: false,
      },
      state: {
        type: 'string',
        required: false,
      },
      country: {
        type: 'string',
        required: false,
      },
      woocommerceCustomerId: {
        type: 'number',
        required: false,
      },
    },
  },
});
