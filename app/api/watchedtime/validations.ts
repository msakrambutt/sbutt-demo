import Joi from "joi";

// export const getQuizBankListSchema = Joi.object({
// 	page: Joi.number().integer().min(1).optional().default(1),
// 	perPage: Joi.number().integer().optional().default(perPageCount),
// 	take: Joi.number().integer().optional().default(perPageCount),
// 	isActive: Joi.string().optional(),
// 	title: Joi.string().optional(),
// });

export const watchedVideosCreationSchema = Joi.object({
  playlist_id: Joi.number().integer().required(),
  watch_video_no: Joi.number().integer().required(),
  watch_video_id: Joi.string().required(),
  completed: Joi.boolean().optional(),
});

export const watchedVideosUpdateSchema = Joi.object({
  watch_video_no: Joi.number().integer().required(),
  watch_video_id: Joi.string().required(),
  completed: Joi.boolean().optional(),
});