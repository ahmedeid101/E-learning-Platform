import { Document, Types } from 'mongoose';

export interface ICourse extends Document{
  title: String;
  description: String;
  catigory: String;
  price: number;
  instructor: Types.ObjectId;
}