import { UserInputError } from 'apollo-server';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import config from '../../../config';
import User from '../../models/User';
import {
  validateLoginInput,
  validateRegisterInput,
} from '../../utils/validators';

const generateToken = (user) => {
  return sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    config.JWT_SECRET,
    { expiresIn: '1h' },
  );
};

const userResolvers = {
  Mutation: {
    login: async (_, { username, password }) => {
      const { errors, valid } = validateLoginInput(
        username,
        password,
      );

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }

      if (!(await compare(password, user.password))) {
        errors.general = 'Wrong crendetials';
        throw new UserInputError('Wrong crendetials', { errors });
      }

      return {
        ...user._doc,
        id: user._id,
        token: generateToken(user),
      };
    },

    register: async (
      _parent,
      {
        registerInput: {
          username,
          password,
          confirm_password,
          email,
        },
      },
      _context,
    ) => {
      try {
        const { valid, errors } = validateRegisterInput({
          username,
          email,
          password,
          confirm_password,
        });

        if (!valid) {
          throw new UserInputError('Validation Errors', { errors });
        }

        if (await User.findOne({ username })) {
          throw new UserInputError('Username is taken', {
            errors: {
              username: 'This username is already taken!',
            },
          });
        }

        password = await hash(password, 12);

        const user = new User({
          username,
          password,
          createdAt: new Date().toISOString(),
          email,
        });

        const result = await user.save();
        const token = generateToken(result);
        return { ...result._doc, id: result._id, token };
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
export default userResolvers;
