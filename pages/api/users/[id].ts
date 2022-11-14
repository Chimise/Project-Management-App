import handler from "../../../utils/handler";
import { findOne, updateOne } from "../../../controllers/user";
import isAuth from "../../../middlewares/isAuth";

export default handler().use(isAuth).patch(updateOne);