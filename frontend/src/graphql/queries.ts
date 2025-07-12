import client from './client';
import { gql } from '@apollo/client';
import { Course } from '../types';

const GET_COURSES = gql`
  query GetAllCourses {
    getAllCourses {
      id
      title
      description
      level
    }
  }
`;

export const getCourses = async (): Promise<Course[]> => {
  const { data } = await client.query({ query: GET_COURSES });
  return data.getAllCourses;
};

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      id
      name
      email
      role
    }
  }
`;

export const getUserByEmail = async (email: string) => {
  const { data } = await client.query({
    query: GET_USER_BY_EMAIL,
    variables: { email },
    fetchPolicy: 'network-only',
  });
  return data.getUserByEmail;
};

export const GET_ENROLLMENT = gql`
  query GetEnrollment($userId: ID!, $courseId: ID!) {
    getEnrollment(userId: $userId, courseId: $courseId) {
      id
    }
  }
`;

export const getEnrollment = async (userId: string, courseId: string) => {
  const { data } = await client.query({
    query: GET_ENROLLMENT,
    variables: { userId, courseId },
    fetchPolicy: 'network-only',
  });
  return data.getEnrollment;
};

export const ENROLL_USER = gql`
  mutation EnrollUser($userId: ID!, $courseId: ID!) {
    enrollUser(userId: $userId, courseId: $courseId) {
      id
      user {
        id
        name
        email
        role
      }
      course {
        id
        title
        description
        level
      }
    }
  }
`;

export const enrollUser = async (userId: string, courseId: string) => {
  const { data } = await client.mutate({
    mutation: ENROLL_USER,
    variables: { userId, courseId },
  });
  return data.enrollUser;
};