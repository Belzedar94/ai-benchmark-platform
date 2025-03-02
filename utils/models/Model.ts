import mongoose, { Schema } from 'mongoose';

export interface IModel {
  name: string;
  identifier: string;
  provider: string;
  eloScore: number;
  wins: number;
  losses: number;
  draws: number;
  totalAppearances: number;
  arenaType: string;
  isActive: boolean;
}

const ModelSchema = new Schema<IModel>(
  {
    name: { type: String, required: true },
    identifier: { type: String, required: true, unique: true },
    provider: { type: String, required: true },
    eloScore: { type: Number, default: 1000 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
    totalAppearances: { type: Number, default: 0 },
    arenaType: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Model || mongoose.model<IModel>('Model', ModelSchema);