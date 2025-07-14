const { User, Course, Enrollment } = require('../models');

const resolvers = {
    Query: {
        getAllCourses: async () => await Course.findAll(),
        getCourseById: async (_, { id }) => await Course.findByPk(id),
        getUserByEmail: async (_, { email }) => await User.findOne({ where: { email } }),
        getEnrollment: async (_, { userId, courseId }) => await Enrollment.findOne({ where: { user_id: userId, course_id: courseId } })
    },
    Mutation: {
        enrollUser: async (_, { userId, courseId }) => {
            const enrollment = await Enrollment.create({ user_id: userId, course_id: courseId });
            return enrollment;
        },
        createCourse: async (_, { title, description, level }, context) => {
            return await Course.create({ title, description, level });
        }
    },
    Enrollment: {
        user: async (enrollment) => await User.findByPk(enrollment.user_id),
        course: async (enrollment) => await Course.findByPk(enrollment.course_id)
    }
};

module.exports = resolvers;