import Joi from 'joi';

// export const getQuizBankListSchema = Joi.object({
// 	page: Joi.number().integer().min(1).optional().default(1),
// 	perPage: Joi.number().integer().optional().default(perPageCount),
// 	take: Joi.number().integer().optional().default(perPageCount),
// 	isActive: Joi.string().optional(),
// 	title: Joi.string().optional(),
// });

export const playListCreationSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    order_date: Joi.date().required(),
    course_id: Joi.string().max(255).required(),
  });
  