import mongoose from "mongoose";

const toObjectId = (id: string): mongoose.Types.ObjectId  => {
    return new mongoose.Types.ObjectId(id); // ✅ return the actual ObjectId
};
export default toObjectId;
