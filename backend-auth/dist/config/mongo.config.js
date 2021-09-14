var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from 'mongoose';
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('process.env.MONGODB_HOST: ', process.env.MONGODB_HOST);
            const HOST = process.env.MONGODB_HOST || 'localhost:27017';
            console.log('HOST: ', HOST);
            const con = yield mongoose.connect(`mongodb://${HOST}/draketech-test`, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
            console.log(`Database connected : ${con.connection.host}`);
        }
        catch (error) {
            console.error(`Error***: ${error.message}`);
            process.exit(1);
        }
    });
}
export default connectDB;
