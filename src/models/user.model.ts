import { IUSER } from '@/types/user.types';
import mongoose, {Document} from 'mongoose';
import bcrypt from 'bcrypt';


interface IUserDocument extends Omit<IUSER, '_id'>, Document {
    comparePassword(password: string): Promise<boolean>;
}


const userSchema = new mongoose.Schema<IUserDocument>({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        minlength: [6, 'Min length is 6 characters'],
        required: [true, 'password is required']
    },
    mobile: {
        type: String,
        minlength: [10, 'Min length is 10 characters'],
        maxlength: [10, 'Max length is 10 characters'],
    }
},{
    timestamps: true
})



userSchema.pre('save', async function() : Promise<void> {
    if(!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
    return bcrypt.compareSync(password, this.password);
}

const userModel =
    mongoose.models.user ||
    mongoose.model('user', userSchema);

export default userModel;