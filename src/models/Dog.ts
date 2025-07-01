import { Schema, model, Document } from 'mongoose';

export interface DogDocument extends Document {
  name: string;
  dateOfBirth: Date;
  breed: string;
}

const dogSchema = new Schema<DogDocument>({
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  breed: { type: String, required: true },
});

export const Dog = model<DogDocument>('Dog', dogSchema);
