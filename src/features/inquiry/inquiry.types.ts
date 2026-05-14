import type { z } from "zod";

import type { inquirySchema, inquirySubmissionSchema } from "./inquiry.schema";

export type Inquiry = z.infer<typeof inquirySchema>;
export type InquiryInput = z.input<typeof inquirySchema>;
export type InquirySubmission = z.infer<typeof inquirySubmissionSchema>;

