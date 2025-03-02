import mongoose, { Schema } from 'mongoose';

export interface IPrompt {
  text: string;
  arenaType: string;
  submittedBy?: string;
  status: 'pending' | 'approved' | 'rejected';
  usageCount: number;
  isActive: boolean;
}

const PromptSchema = new Schema<IPrompt>(
  {
    text: { type: String, required: true },
    arenaType: { type: String, required: true },
    submittedBy: { type: String },
    status: { 
      type: String, 
      enum: ['pending', 'approved', 'rejected'], 
      default: 'pending' 
    },
    usageCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Prompt || mongoose.model<IPrompt>('Prompt', PromptSchema);