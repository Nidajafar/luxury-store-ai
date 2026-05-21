import mongoose from "mongoose";
const connectDb=async () => {
  if (mongoose.connections[0].readyState)return
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Mongo db connected");
    
  } catch (error) {
    console.error("not contected",error)
    
  } 
}
export default connectDb