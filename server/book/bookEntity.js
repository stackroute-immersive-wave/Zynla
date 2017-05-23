let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let schema = new mongoose.Schema({
		author: String,
	  timestamp: Number,
	  id: {type:Number,required:true},
	  tocID:Number,
	  book: [
	    {
	      Domain: String,
	      name: String,
	      title: String,
				_id:false,
	      Chapter: {
					type:[
		        {
							_id:false,
							content:{
								type:[{
									name: String,
									_id:false,
									intent: String,
									value: {
										type:[
											{
												label: String,
												_id:false,
												value: String
											}
										],
										    /* eslint-disable */
										default:undefined
									}

								}],
								default:undefined

							},
		          name: String,
		          Topic: {
								type:[
			            {
										_id:false,
										content:{
											type:[{
												name: String,
												_id:false,
												intent: String,
												value: {
													type:[
														{
															label: String,
															_id:false,
															value: String,
														}
													],
													default:undefined
												}

											}],
											default:undefined

										},
			              name: String,
			              Subtopic: {
											type:[
				                {
													_id:false,
				                  name: String,
				                  intent: String,
				                  value: {
														type:[
					                    {
																_id:false,
					                      label: String,
					                      value: String
					                    }
					                  ],
														default:undefined
													}
				                }
				              ],
											default:undefined
										}
			            }
			          ],
								default:undefined
							}
		        }
		      ],
					default:undefined
				}
	    }
	  ]
});
    /* eslint-enable */

const model = mongoose.model('bookdoc', schema);
module.exports = model;
