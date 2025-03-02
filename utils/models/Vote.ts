import mongoose, { Schema } from 'mongoose';

export interface IVote {
  promptId: mongoose.Types.ObjectId;
  modelAId: mongoose.Types.ObjectId;
  modelBId: mongoose.Types.ObjectId;
  responseA: string;
  responseB: string;
  winner: mongoose.Types.ObjectId | 'tie';
  arenaType: string;
  sessionId?: string;
}

const VoteSchema = new Schema<IVote>(
  {
    promptId: { type: Schema.Types.ObjectId, ref: 'Prompt', required: true },
    modelAId: { type: Schema.Types.ObjectId, ref: 'Model', required: true },
    modelBId: { type: Schema.Types.ObjectId, ref: 'Model', required: true },
    responseA: { type: String, required: true },
    responseB: { type: String, required: true },
    winner: { 
      type: Schema.Types.Mixed, 
      required: true,
      validate: {
        validator: function(v: mongoose.Types.ObjectId | string) {
          return v === 'tie' || mongoose.Types.ObjectId.isValid(v);
        },
        message: props => `${props.value} is not a valid ObjectId or 'tie'`
      }
    },
    arenaType: { type: String, required: true },
    sessionId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Vote || mongoose.model<IVote>('Vote', VoteSchema);