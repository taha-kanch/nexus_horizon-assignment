const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
id: ID!
name: String!
email: String!
role: String!
}

type Course {
id: ID!
title: String!
description: String!
level: String!
}

type Enrollment {
  id: ID!
  user: User!
  course: Course!
}

type Query {
getAllCourses: [Course]
getCourseById(id: ID!): Course
getUserByEmail(email: String!): User
getEnrollment(userId: ID!, courseId: ID!): Enrollment
}

type Mutation {
enrollUser(userId: ID!, courseId: ID!): Enrollment
}
`;

module.exports = typeDefs;